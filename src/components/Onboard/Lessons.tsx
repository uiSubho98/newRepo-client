import React, { useEffect } from 'react';
import { Button } from 'antd';
import RedirectForm from '../BootcampDashboard/RedirectForm';

interface IProps {
    hasStartedLearning: boolean;
    updateStep: Function;
}

const Lessons = (props: IProps) => {

    const { hasStartedLearning, updateStep } = props;

    useEffect(() =>{
        if(hasStartedLearning) {
            updateStep()
        }
    }, [hasStartedLearning, updateStep]);

    const redirect = (r_path: string) => {
        // Update the value of r_path
        (document.getElementById('r_path') as 
        HTMLInputElement).value = r_path;
        (document.getElementById('learning_redirect') as 
        HTMLFormElement).submit();
    }

    const startLearning = () => {
        redirect("dashboard/?p=pre-work")
    }

    return (
        <>
            <div className="lessons-wrapper w-80">
                <span className="text-regular description">
                    Get started with interactive lessons on <span className="strong-text">‘Introduction to Coding’</span> (Term 0). 
                    Remember, any doubts, your friends and mentors are always there on the 
                    ProGrad community on Slack.
                </span>
                <div className="f-d f-h-s f-v-c action-elements-wrapper">
                    <Button
                        className="start-learning-btn default-blue-btn btn-small"
                        onClick={() => startLearning()}
                    >
                        Start learning
                    </Button>
                    <span className="skip-btn text-regular c-pointer"
                    onClick={() => updateStep()}>
                        I’ll do this later
                    </span>
                </div>
            </div>
            <RedirectForm />
            <style jsx>{`
                .lessons-wrapper {
                    background-color: var(--primary-bg);
                    padding: var(--peaky-pad-32);
                }

                .lessons-wrapper .description {
                    opacity: 0.87;
                }

                .lessons-wrapper .action-elements-wrapper {
                    margin: var(--peaky-gap-48) 0 0;
                }

                .lessons-wrapper .skip-btn {
                    text-decoration: underline;
                    margin:0 0 0 var(--peaky-gap-32);
                }

                @media only screen and (max-device-width: 760px) {
                    .lessons-wrapper {
                        width: 100%;
                        padding: var(--peaky-gap-16);
                    }

                    .lessons-wrapper .action-elements-wrapper {
                        flex-direction: column;
                    }

                    .lessons-wrapper .skip-btn {
                        margin: var(--peaky-gap-24) 0 0;
                    }
                }
            `}</style>
        </>
    )
}

export default Lessons;