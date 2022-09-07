import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import LoginForm from "../Login/LoginForm";
import SignupForm from "../Signup/SignupForm";
import Registration from "./Registration";
import { check_login } from "../../utils/login.util";
import SocialConfirmation from "../../pages/SocialConfirmation/SocialConfirmation";
 
interface IProps {
    setModalData: Function;
    modalData: { isVisible: boolean, mode: number, type:string }
    rerender: Function;
    program ?: string;
    url?: string;
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
    const [state, setState] = useState<IState>({});
    const {setModalData, modalData, program, url } = props;

    useEffect(() => {
        if(check_login()) {
            setModalData((prev: any) => ({
                ...prev,
                mode: 3
            }));
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{
        props.rerender();
    }, [modalData.mode]); // eslint-disable-line react-hooks/exhaustive-deps
    
    const setMode = (val: number) => {
        setModalData((prev: any) => ({
            ...prev,
            mode: val
        }));  
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
                        setMode={setMode}
                        closeModal={closeModal}
                        program = {program}
                        url = {url} 
                        type = {modalData && modalData.type}
                    /> 
                    :
                    <></>
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