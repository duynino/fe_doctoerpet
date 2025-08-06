import React from "react";
import HeaderPage from "../../components/header";
import FooterPage from "../../components/footer";
import Calendar from "../../components/Calendar/Calendar";

const CalendarPage = () => {
    return (
        <>
            <HeaderPage />
            <div
                className="calendar-container"
                style={{ height: "80vh", minHeight: "500px", width: "100%" }}
            >
                <Calendar />
            </div>
            <FooterPage />
        </>
    );
};

export default CalendarPage;
