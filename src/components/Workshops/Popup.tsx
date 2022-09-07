import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import LoginForm from "../Login/LoginForm";
import SignupForm from "../Signup/SignupForm";
import Registration from "./Registration/Registration";
import Checkout from "./Checkout/Checkout";
import { check_login } from "../../utils/login.util";
import SocialConfirmation from "../../pages/SocialConfirmation/SocialConfirmation";

interface IProps {
    workshopKey: string;
    workshopPrice: number;
    workshopType: string;
    title: string;
    startTime: number;
    regFields?: any;
    regQuestions?: any;
    rerender: Function;
    setModalData: Function;
    modalData: { isVisible: boolean, mode: number }
    registrationsClosed: boolean;
}

interface IState {
    provider?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    img?: string,
    id?: string
}

const Popup = (props: IProps) => {
    const [userInfo, setUserInfo] = useState<any>({});
    const [state, setState] = useState<IState>({});
    const { workshopKey, workshopPrice, workshopType, title, startTime, setModalData, modalData, registrationsClosed, regFields, regQuestions } = props;

    useEffect(() => {
        if(check_login()) {
            // Check if registrations are full
            if(registrationsClosed){
                setModalData((prev: any) => ({
                    ...prev,
                    isVisible: false
                }));
            } else {
                setModalData((prev: any) => ({
                    ...prev,
                    mode: 3
                }));
            }
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        props.rerender();
    }, [modalData.mode]); // eslint-disable-line react-hooks/exhaustive-deps
    
    const setMode = (val: number) => {
        if(val === 3 && registrationsClosed) {
            setModalData((prev: any) => ({
                ...prev,
                isVisible: false
            }));
        } else {
            setModalData((prev: any) => ({
                ...prev,
                mode: val
            }));
        }
    }

    const closeModal = () => {
        setModalData((prev: any) => ({
            ...prev,
            isVisible: false
        }));
    }

    return (
        <>
            <Modal
                footer={null}
                visible={modalData.isVisible}
                onCancel={() => {
                    setModalData((prev: any) => ({
                        ...prev,
                        isVisible: false
                    }));
                }}
                destroyOnClose={true}
                className="workshop-action-modal"
            >
                {
                    modalData.mode === 0 ?
                    <LoginForm type={"workshop"} setMode={setMode} setState={setState} /> :
                    modalData.mode === 1 ?
                    <SignupForm type={"workshop"} setMode={setMode} setState={setState} /> :
                    modalData.mode === 2 ?
                    <SocialConfirmation isWorkshop={true} setMode={setMode} info = {state} /> :
                    modalData.mode === 3 ?
                    <Registration 
                        workshopKey={workshopKey}
                        workshopPrice={workshopPrice}
                        workshopType={workshopType} 
                        title={title}
                        regFields={regFields}
                        regQuestions={regQuestions}
                        setMode={setMode}
                        setInfo={setUserInfo}
                        closeModal={closeModal}
                    /> :
                    <Checkout 
                        userInfo={userInfo}
                        workshopKey={workshopKey}
                        workshopPrice={workshopPrice}
                        workshopType={workshopType}
                        title={title} 
                        startTime={startTime}
                        price={workshopPrice}
                    />
                }
            </Modal>

            <style jsx>{`
                .workshop-action-modal.ant-modal {
                    width: max-content !important;
                }

                .workshop-action-modal .ant-modal-body {
                    background: linear-gradient(180deg, #2E2E2E 0%, #1E1E1E 100%) !important;
                    display: grid;
                    justify-content: center;
                    padding: var(--peaky-pad-32) 64px;
                }

                .workshop-action-modal .ant-modal-close-x {
                    display: none;
                }

                @media only screen and (max-device-width: 760px) {

                    .workshop-action-modal.ant-modal {
                        width: 90% !important;
                        max-width: unset;
                    }

                    .workshop-action-modal .ant-modal-body {
                        padding-right: var(--peaky-pad-16);
                        padding-left: var(--peaky-pad-16);
                    }
                }
            `}</style>
        </>
    )
}

export default Popup;