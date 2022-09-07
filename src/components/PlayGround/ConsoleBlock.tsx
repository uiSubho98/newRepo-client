import React, {useEffect, useRef, useCallback} from "react";
import consoleClear from '../../assets/icons/svg-icons-v2/console-clear.svg';
import { Tooltip } from 'antd';
import './Console.css';

interface IConsoleBlockProps {
    history: Array<{text: string}>
    clearHistory: () => void
    sidebarActive: boolean
    consoleStatus: boolean
    handleConsoleStatus: (val: boolean) => void
}

const ConsoleBlock = (props: IConsoleBlockProps) => {
    const { history, clearHistory, sidebarActive, consoleStatus, handleConsoleStatus } = props
    const scrollDiv = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        animateScroll(300);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [history, scrollToBottom]);

    // Auto Scroll Function
    const animateScroll = (duration: number) => {
        var start = scrollDiv.current!.scrollTop;
        var end = scrollDiv.current!.scrollHeight;
        var change = end - start;
        var increment = 20;

        function easeInOut(currentTime: number, start: number, change: number, duration: number) {
            currentTime /= duration / 2;
            if (currentTime < 1) {
                return (change / 2) * currentTime * currentTime + start;
            }
            currentTime -= 1;
            return (-change / 2) * (currentTime * (currentTime - 2) - 1) + start;
        }

        function animate(elapsedTime: number) {
            elapsedTime += increment;
            var position = easeInOut(elapsedTime, start, change, duration);
            scrollDiv.current!.scrollTop = position;
            if (elapsedTime < duration) {
                setTimeout(function () {
                    animate(elapsedTime);
                }, increment);
            }
        }

        animate(0);
    };

    const handleClearClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        // Call clear function
        clearHistory();
        e.stopPropagation();
    }

    return (
        <>
            <div
                className={`playground-console-container ${consoleStatus ? 'active' : ''} ${!sidebarActive ? 'side-inactive' : ''}`}
            >
                <div
                    className="section-header c-pointer f-d f-v-c f-h-sb"
                    onClick={() => handleConsoleStatus(!consoleStatus)}
                >
                    <div className="header-left f-d f-v-c">
                        <div className="title">Console</div>
                        {consoleStatus &&
                            <Tooltip
                                placement="right"
                                title={'Clear Console'}
                            >
                                <div
                                    onClick={(e) => handleClearClick(e)}
                                    className="clear-btn f-d f-v-c f-h-c"
                                >
                                    <div
                                        className="console-clear-icon bg-image-full"
                                        style={{ backgroundImage: `url(${consoleClear})` }}></div>
                                </div>
                            </Tooltip>
                        }
                    </div>
                    <div
                        className="section-action-btn c-pointer f-d f-v-c f-h-c"
                    >
                        <i className="icon icon-chevron-up"></i>
                    </div>
                </div>
                <div ref={scrollDiv} className="playground-console">
                    <ul>
                        {history.map((item: {text: string}, index: number) => (
                            <li key={index} className="console-line">
                                <span className="console-carrot">{`>`}</span>{" "}
                                <span className="console-text">{item.text}</span>
                            </li>
                        ))}
                        <li>
                            <span className="console-carrot">{`>`}</span>
                        </li>
                    </ul>

                    {/* <div
                        onClick={() => clearHistory([])}
                        className="clear-btn"
                    >
                        Clear
                    </div> */}
                </div>
            </div>

            <style jsx>
                {`
                .playground-console-container .header-left .clear-btn {
                    margin-left: 1rem;
                }

                .header-left .clear-btn {
                    width: 24px;
                    height: 24px;
                    border-radius: var(--peaky-br-4);
                    background: rgba(0, 0, 0, 0);
                    transition: all 0.2s;
                }

                .clear-btn .console-clear-icon {
                    width: 20px;
                    height: 20px;
                    opacity: 0.6;
                    transition: all 0.2s;
                    cursor: pointer;
                }

                .clear-btn:hover {
                    background: rgba(0, 0, 0, 1);
                }

                .clear-btn:hover .console-clear-icon {
                    opacity: 1;
                }
                `}
            </style>
        </>
    );
}

export default ConsoleBlock;
