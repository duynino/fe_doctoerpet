import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { parseISO } from "date-fns";
import { toast } from "react-toastify";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ApiInstance from "../../axios/index";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const statusList = [
    { id: 1, value: "Sắp tới", label: "Sắp tới" },
    { id: 2, value: "Đang diễn ra", label: "Đang diễn ra" },
    { id: 3, value: "Hoàn thành", label: "Hoàn thành" },
    { id: 4, value: "Đã hủy", label: "Đã hủy" },
];

const CalendarApp = () => {
    const [events, setEvents] = useState([]);
    const [modalStatus, setModalStatus] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [editStatus, setEditStatus] = useState(false);
    const [onChange, setOnChange] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        start: new Date(),
        end: new Date(),
        status: statusList[0].value, // Set default status
    });

    const formatDateForInput = (date) => {
        if (!date) return "";
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60000);
        return localDate.toISOString().slice(0, 16);
    };

    // Get events from API
    const fetchEvents = async () => {
        try {
            const response = await ApiInstance.get("/schedule/");
            if (response.data && Array.isArray(response.data)) {
                const fetchedEvents = response.data.map((event) => ({
                    ...event,
                    start: new Date(event.start),
                    end: new Date(event.end),
                }));
                setEvents(fetchedEvents);
            }
        } catch (error) {
            console.error("Lỗi khi lấy sự kiện:", error);
            toast.error("Không thể tải sự kiện từ máy chủ");
        }
    };

    // Call fetchEvents when the component mounts
    useEffect(() => {
        fetchEvents();
    }, [onChange]);

    const handleClose = () => {
        setModalStatus(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            start: new Date(),
            end: new Date(),
            status: statusList[0].value, // Reset to default status
        });
        setSelectedEvent(null);
        setEditStatus(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSlotSelectEvent = (slotInfo) => {
        setModalStatus(true);
        setFormData({
            title: "",
            description: "",
            start: slotInfo.start,
            end: slotInfo.end,
            status: statusList[0].value, // Set default status
        });
        setEditStatus(false);
        setSelectedEvent(null);
    };

    const moveEventHandler = async ({ event, start, end }) => {
        try {
            // Update the event in the backend
            await ApiInstance.put(`/schedule/update/${event.scheduleID}`, {
                title: event.title,
                description: event.description,
                start: moment(start).format("YYYY-MM-DDTHH:mm:ss"),
                end: moment(end).format("YYYY-MM-DDTHH:mm:ss"),
                status: event.status,
            });
            setOnChange(!onChange); // Trigger re-fetch of events
        } catch (error) {
            console.error("Lỗi khi cập nhật sự kiện:", error);
            toast.error("Không thể cập nhật sự kiện trên máy chủ");
        }
    };

    const resizeEventHandler = async ({ event, start, end }) => {
        try {
            // Update the event in the backend
            await ApiInstance.put(`/schedule/update/${event.scheduleID}`, {
                title: event.title,
                description: event.description,
                start: moment(start).format("YYYY-MM-DDTHH:mm:ss"),
                end: moment(end).format("YYYY-MM-DDTHH:mm:ss"),
                status: event.status,
            });
            setOnChange(!onChange); // Trigger re-fetch of events
        } catch (error) {
            console.error("Lỗi khi cập nhật sự kiện:", error);
            toast.error("Không thể cập nhật sự kiện trên máy chủ");
        }
    };

    const handleOnSelectEvent = (e) => {
        setEditStatus(true);
        setFormData({
            title: e.title,
            description: e.description,
            start: e.start,
            end: e.end,
            status: e.status,
        });
        setSelectedEvent(e);
        setModalStatus(true);
    };

    // Function to handle the edited event
    const handleEdited = async () => {
        try {
            const updatedEvent = {
                ...selectedEvent,
                title: formData.title,
                description: formData.description,
                start: new Date(formData.start),
                end: new Date(formData.end),
                status: formData.status,
            };

            // Update the event in the backend
            await ApiInstance.put(`/schedule/update/${selectedEvent.scheduleID}`, {
                title: updatedEvent.title,
                description: updatedEvent.description,
                start: moment(updatedEvent.start).format("YYYY-MM-DDTHH:mm:ss"),
                end: moment(updatedEvent.end).format("YYYY-MM-DDTHH:mm:ss"),
                status: updatedEvent.status,
            });
            console.log("Sự kiện đã được cập nhật trên máy chủ");

            // Update the local state
            const updatedEvents = events.map((e) =>
                e.scheduleId === selectedEvent.scheduleId ? updatedEvent : e
            );
            setEvents(updatedEvents);
            setModalStatus(false);
            resetForm();
            setOnChange(!onChange); // Trigger re-fetch of events
        } catch (error) {
            console.error("Lỗi khi chỉnh sửa sự kiện:", error);
            toast.error("Không thể chỉnh sửa sự kiện");
        }
    };

    const handleDelete = async () => {
        try {
            await ApiInstance.post(`/schedule/delete/${selectedEvent.scheduleID}`);
            const updatedEvents = events.filter((e) => e.scheduleID !== selectedEvent.scheduleID);
            setEvents(updatedEvents);
            setModalStatus(false);
            resetForm();
            toast.success("Sự kiện đã được xóa thành công");
            setOnChange(!onChange); // Trigger re-fetch of events
        } catch (error) {
            console.error("Lỗi khi xóa sự kiện:", error);
            toast.error("Không thể xóa sự kiện");
        }
    };

    // Function to handle saving a new event
    const handleSave = async () => {
        try {
            const response = await ApiInstance.post("/schedule/add", {
                title: formData.title,
                description: formData.description,
                start: moment(formData.start).format("YYYY-MM-DDTHH:mm:ss").toString(),
                end: moment(formData.end).format("YYYY-MM-DDTHH:mm:ss").toString(),
                status: formData.status,
            });
            const newEvent = {
                ...formData,
                scheduleID: response.data.scheduleID, // Assuming the API returns the new event ID
                start: new Date(formData.start),
                end: new Date(formData.end),
            };
            setEvents([...events, newEvent]);
            setModalStatus(false);
            resetForm();
            toast.success("Sự kiện đã được lưu thành công");
            console.log("Sự kiện đã được lưu trên máy chủ");
            setOnChange(!onChange); // Trigger re-fetch of events
        } catch (error) {
            console.error("Lỗi khi lưu sự kiện:", error);
            toast.error("Không thể lưu sự kiện trên máy chủ");
        }
    };

    return (
        <div
            className="my-calendar"
            style={{ height: "80vh", width: "100%", position: "relative", overflow: "hidden" }}
        >
            <DnDCalendar
                backend={HTML5Backend}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSlotSelectEvent}
                onSelectEvent={handleOnSelectEvent}
                onEventDrop={moveEventHandler}
                resizable
                onEventResize={resizeEventHandler}
                longPressThreshold={10}
                style={{ height: "100%", width: "100%" }}
                toolbar={true}
                views={["month", "week", "day", "agenda"]}
                defaultView="month"
            />

            <Dialog open={modalStatus} onClose={handleClose}>
                <DialogTitle>{editStatus ? "Chỉnh sửa sự kiện" : "Tạo sự kiện mới"}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Tên sự kiện"
                        type="text"
                        fullWidth
                        variant="outlined"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Mô tả sự kiện"
                        type="text"
                        fullWidth
                        variant="outlined"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                    />
                    <TextField
                        margin="dense"
                        label="Ngày bắt đầu"
                        type="datetime-local"
                        fullWidth
                        variant="outlined"
                        name="start"
                        value={formatDateForInput(formData.start)}
                        onChange={(e) =>
                            setFormData({ ...formData, start: parseISO(e.target.value) })
                        }
                    />
                    <TextField
                        margin="dense"
                        label="Ngày kết thúc"
                        type="datetime-local"
                        fullWidth
                        variant="outlined"
                        name="end"
                        value={formatDateForInput(formData.end)}
                        onChange={(e) =>
                            setFormData({ ...formData, end: parseISO(e.target.value) })
                        }
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="status-select-label">Trạng thái</InputLabel>
                        <Select
                            labelId="status-select-label"
                            id="status-select"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            {statusList.map((status) => (
                                <MenuItem key={status.id} value={status.value}>
                                    {status.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    {editStatus ? (
                        <>
                            <Button onClick={handleEdited} color="primary">
                                Lưu thay đổi
                            </Button>
                            <Button onClick={handleDelete} color="secondary">
                                Xóa
                            </Button>
                        </>
                    ) : (
                        <Button onClick={handleSave} color="primary">
                            Lưu
                        </Button>
                    )}
                    <Button onClick={handleClose} color="secondary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CalendarApp;
