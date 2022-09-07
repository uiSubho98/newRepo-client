import React from "react";
import { Modal, Switch, Icon, Button } from "antd";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

const CustomDates = (props: any) => {
    const {
        visible,
        ModalCancel,
        selectedDays,
        handleDayClick,
        disableDate,
        published_status,
        onChange,
        handleApplyBtn,
    } = props;

    let switch_className = "";

    if (published_status) switch_className = "switch-true";

    // let disableDatev1 = disableDate.valueOf();
    return (
        <>
            <Modal
                title={"Apply to custom dates"}
                visible={visible}
                onCancel={ModalCancel}
                footer={null}
                width={900}
                destroyOnClose={true}
            >
                <div className="f-d f-h-sb" id={disableDate}>
                    {
                    <DayPicker
                        // id={disableDate}
                        selectedDays={selectedDays}
                        onDayClick={handleDayClick}
                        disabledDays={{
                            before: new Date(),
                        }}
                    />
                    }
                </div>

                <div className="f-d f-h-e f-v-c custom-date-wrapper">
                    <div className={`publish-check f-d ${switch_className}`}>
                        <div className="msg">Published</div>
                        <Switch
                            checked={published_status}
                            onChange={(e) => onChange(e, "select")}
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                        />
                    </div>
                    <div>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={handleApplyBtn}
                            id="apply-btn"
                        >
                            Apply
                        </Button>
                    </div>
                </div>
            </Modal>
            <style jsx>{`
                .DayPicker {
                    margin: 0 auto;
                }
                .custom-date-wrapper #apply-btn {
                    background-color: var(--purple);
                    outline: none;
                    border: none;
                    margin-left: 2rem;
                }

                .custom-date-wrapper .publish-check .msg {
                    margin-right: 16px;
                }
            `}</style>
        </>
    );
};

export default CustomDates;
