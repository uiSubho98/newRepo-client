import React, { useEffect, useRef, useState } from "react";
import sampleWorkshopJsonV1 from "./workshop_sample_v1.json";
import sampleWorkshopJsonV2 from "./workshop_sample_v2.json";
import { Form, Table, Input, Button, Modal, Spin, Select, Upload, Tag, Tooltip, Switch } from "antd";
import { check_login } from "../../../utils/login.util";
import * as Constants from "../../../constants/constants";
import { __getToken, __getUID } from "../../../utils/user-details.util";
import axios from "axios";
import { openNotification } from "../../../utils/common.util";
const { TextArea } = Input;
const { Option } = Select;

interface IState {
    data: Array<any>;
    videoUrls: Array<any>;
    inputVisible: boolean;
    inputValue: string;
    uploadedVideos: Array<any>;
    uploadedThumbnail: string;
    jsonData: string;
    editInputIndex: number;
    editInputValue: string;
    loading: boolean;
    spinner: boolean;
    workshop_data: Array<any>;
    pagination: {
        current: number;
        pageSize: number;
    };
    modalTitle: string;
    readOnly: boolean;
    visible: boolean;
    priceHidden: boolean;
    workshopKey: string;
    customSlug: string;
    fileList: Array<any>;
    recordingLinks: Array<any>;
    recordingThumbnail: string;
    thumbnaillist: Array<any>;
    uploading: boolean;
    tags: string;
    preview: string;
    searchedColumn: string;
    gtw_account_key: string;
    gtw_organizer_key: string;
    price: any;
    workshopType: string;
    spinnerTxt: string;
    updateMode: string;
    actionBtnLabel: string
    workshopMode: number
}


const WorkshopsAdmin = () => {
    if(!check_login()) {
        window.location.href = Constants.G_HOME_URL + "login/?rurl=admin";
    }
    
    const [state, setState] = useState<IState>({
        data: [],
        videoUrls: [],
        inputVisible: false,
        inputValue: '',
        uploadedVideos: [],
        uploadedThumbnail: '',
        jsonData: '',
        editInputIndex: -1,
        editInputValue: '',
        loading: true,
        spinner: false,
        workshop_data: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        modalTitle: "",
        readOnly: false,
        visible: false,
        priceHidden: true,
        workshopKey: "",
        customSlug: "",
        fileList: [],
        recordingLinks: [],
        recordingThumbnail: '',
        thumbnaillist: [],
        uploading: false,
        tags: "",
        preview: "",
        searchedColumn: "",
        gtw_account_key: "",
        gtw_organizer_key: "",
        price: 0,
        workshopType: '',
        spinnerTxt: 'Adding workshop details...',
        updateMode: 'hide-d hide-m',
        actionBtnLabel: 'Add',
        workshopMode: 0
    });
    const editInputRef = useRef(null);
    
    // Load data on initial render
    useEffect(()=>{
        fetchData()
    }, []);

    const fetchData = () => {
        axios
            .get(Constants.G_API_URL + "admin/workshops", {
                headers: {
                    Authorization: __getToken()
                }
            })
            .then(res => {
                const workshop_data = res.data.workshops;
                setState(prev => ({
                    ...prev,
                    loading: false,
                    workshop_data: workshop_data,
                    pageloaded: true
                }));
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleClose = () => {
        setState(prev => ({
            ...prev,
            visible: false,
            customSlug: "",
            workshopKey: "",
            fileList: [],
            videoUrls: [],
            jsonData: '',
            thumbnaillist: [],
            tags: "",
            preview: "",
            priceHidden: true,
            price: 0,
            workshopType: '',
            loading: false,
        }));
    };
    
    const addNewworkshop = () => {
        setState(prev => ({
            ...prev,
            modalTitle: 'Enter workshop Details',
            readOnly: false,
            visible: true,
            fileList: [],
            thumbnaillist: [],
            videoUrls: [],
            jsonData: '',
            updateMode: 'hide-d hide-m',
            spinner: false,
            actionBtnLabel: 'Add'
        }));
    };

    const handleSubmit = async () => {
        let landingPageData = {};
        let validJson = true;
        
        if (state.jsonData.trim() !== '') {
            try {
                landingPageData = JSON.parse(state.jsonData);
            } catch (e) {
                validJson = false
            }
        }
        if (validJson) {
            if (state.workshopKey.trim() !== '') {
                if (state.workshopType === 'free' || state.workshopType === '' || (state.workshopType === 'paid' && !isNaN(state.price) && state.price !== 0)) {
                    const { fileList, thumbnaillist } = state;
                    let i = 0;
                    for (i = 0; i < fileList.length; i++) {
                        let files = fileList[i];
                        // eslint-disable-next-line
                        setState(prev => ({
                            ...prev,
                            spinner: true,
                            spinnerTxt: `Uploading Video ${i + 1}, Please wait...`
                        }));
                        let path = "workshop/workshop_recordings/recording_" + Math.round(Date.now() / 1000) + '_' + state.workshopKey + '.' + files.name.split(".")[files.name.split(".").length - 1];
                        const preSignedData = await getPresignedUploadUrl(files, path);
                        await S3VideoUpload(preSignedData, files, path);
                        openNotification("success", `Video ${i + 1} uploaded`);
                    }

                    if (i === fileList.length) {

                        const submit = (thumbnail:string = "") => {
                            setState(prev => ({
                                ...prev,
                                spinner: true
                            }));
                            let workshopType = 'free';
                            if (state.workshopType !== '')
                                workshopType = state.workshopType;
                            let params = {
                                workshopKey: state.workshopKey,
                                customSlug: state.customSlug,
                                workshopPrice: state.price * 100,
                                workshopType: workshopType,
                                workshopMode: state.workshopMode,
                                recordingLinks: state.videoUrls.concat(state.uploadedVideos),
                                uploadedThumbnail: thumbnail,
                                tag: state.tags,
                                preview: state.preview,
                                landingPageData: landingPageData,
                                mode: state.actionBtnLabel === "Add" ? 'add' : 'update'
                            };
                            axios
                                .post(Constants.G_API_URL + "workshops", params)
                                .then(res => {
                                    if (res.data.status === 1) {
                                        openNotification("success", "Workshop added/updated successfully");
                                        // window.location.reload();
                                    } else
                                        openNotification("error", "Unable to add workshop");
                                    setState(prev => ({
                                        ...prev,
                                        // loading: true,
                                        spinner: false,
                                        workshopKey: "",
                                        customSlug: "",
                                        price: 0,
                                        workshopType: "",
                                        videoUrls: [],
                                        uploadedVideos: [],
                                        jsonData: '',
                                        priceHidden: true,
                                        tags: "",
                                        visible: false
                                    }));

                                    setTimeout(() => {
                                        fetchData();
                                    }, 3000)
                                })
                                .catch(error => {
                                    openNotification("error", error.response.data);
                                    setState(prev => ({
                                        ...prev,
                                        loading: false,
                                        workshopKey: "",
                                        tags: "",
                                        spinner: false,
                                        customSlug: "",
                                        price: 0,
                                        workshopType: "",
                                        uploadedVideos: [],
                                        priceHidden: true
                                    }));
                                });
                        }

                        if (thumbnaillist.length > 0) {
                            let files = thumbnaillist[0];
                            setState(prev => ({
                                ...prev,
                                spinner: true,
                                spinnerTxt: `Uploading Thumbnail, Please wait...`
                            }));
                            let path = "workshop/workshop_thumbnail/thumbnail_" + Math.round(Date.now() / 1000) + '_' + state.workshopKey + '.' + files.name.split(".")[files.name.split(".").length - 1];
                            const preSignedData = await getPresignedUploadUrl(files, path);
                            await S3ThumbnailUpload(preSignedData, files, path, submit);
                            openNotification("success", `Thumbnail uploaded`);
                        } else {
                            submit();
                        }
                    }
                } else
                    openNotification("error", "Price is required for paid course");
            } else {
                openNotification("error", "Invalid workshop key");
            }
        } else
            openNotification("error", "Invalid Json");
    };

    const handleKeyChange = (value: any) => {
        setState(prev => ({
            ...prev,
            workshopKey: value,
        }));
    };

    const handleslugChange = (value: any) => {
        setState(prev => ({
            ...prev,
            customSlug: value,
        }));
    };

    // const handletagsChange = (value: any) => {
    //     setState(prev => ({
    //         ...prev,
    //         tags: value,
    //     }));
    // };

    const handlepriceChange = (value: any) => {
        setState(prev => ({
            ...prev,
            price: value,
        }));
    };

    const handleJsonData = (value: any) => {
        setState(prev => ({
            ...prev,
            jsonData: value,
        }));
    };

    const handlePreviewChange = (value: any) => {
        setState(prev => ({
            ...prev,
            preview: value,
        }));
    };

    const handleUpdate = (workshopKey: any, preview: any, customSlug: any, tags: any, workshopType: any, price: any, workshopMode: number, recordingLinks: any, workshopContent: any, recordingThumbnail: any, attendanceLimit: any) => {
        workshopContent = { ...{ attendanceLimit: attendanceLimit }, ...workshopContent };
        setState(prev => ({
            ...prev,
            modalTitle: 'Update workshop Details',
            workshopKey: workshopKey,
            preview: preview,
            customSlug: customSlug,
            workshopType: workshopType,
            updateMode: 'updateNote',
            recordingLinks: recordingLinks,
            recordingThumbnail: recordingThumbnail,
            fileList: [],
            jsonData: JSON.stringify(workshopContent),
            thumbnaillist: [],
            price: price / 100,
            tags: tags,
            readOnly: true,
            visible: true,
            actionBtnLabel: 'Update',
            priceHidden: workshopType !== 'paid',
            workshopMode: workshopMode
        }));
    };


    const downloadJson = (mode: number) => {
        let filename = "workshop_sample.json";
        let data = mode === 0 ? sampleWorkshopJsonV1 : sampleWorkshopJsonV2;
        let contentType = "application/json;charset=utf-8;";
        // @ts-ignore
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(data, null, 2)))], { type: contentType });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            var a = document.createElement('a');
            a.download = filename;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(data, null, 2));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    const handleworkshopTypeChange = (value: any) => {
        if (value === 'paid') {
            setState(prev => ({
                ...prev,
                priceHidden: false,
                workshopType: value,
                price: ''
            }));
        } else {
            setState(prev => ({
                ...prev,
                priceHidden: true,
                workshopType: value,
                price: 0
            }));
        }
    }
    
    const handleWorkshopModeChange = (mode: number) => {
        setState(prev => ({
            ...prev,
            workshopMode: mode
        }));
    }

    const deleteworkshop = (workshopKey: string) => {
        let params = {
            workshopKey: workshopKey,
            uid: __getUID(),
        };
        axios
            .post(Constants.G_API_URL + "workshops/delete", params)
            .then(res => {
                fetchData();
                if (res.data.status === 1)
                    openNotification("success", "workshop deleted successfully");
                else
                    openNotification("error", "Unable to delete workshop");
                setState(prev => ({
                    ...prev,
                    loading: true,
                }));
            })
            .catch(error => {
                console.log(error)
            });
    }

    const handleDelete = (record: any) => {
        const workshopKey = record.workshopKey;
        const workshopName = record.subject;
        Modal.confirm({
            title: 'Delete workshop',
            content: `Are you sure you want to delete workshop '${workshopName}'`,
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk: () => deleteworkshop(workshopKey),
        });
    }

    const handleTagClose = (removedTag: any) => {
        const videoUrls = state.videoUrls.filter(tag => tag !== removedTag);
        setState(prev => ({
            ...prev,
            videoUrls
        }));
    };

    const showInput = () => {
        // this.setState({ inputVisible: true }, () => this.input.focus());
        setState(prev => ({
            ...prev,
            inputVisible: true
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if(value !== undefined) {
            setState(prev => ({
                ...prev,
                inputValue: value
            }));
        }
    };

    const handleInputConfirm = () => {
        const { inputValue } = state;
        let { videoUrls } = state;
        if (inputValue && videoUrls.indexOf(inputValue) === -1) {
            videoUrls = [...videoUrls, inputValue];
        }
        setState(prev => ({
            ...prev,
            videoUrls,
            inputVisible: false,
            inputValue: '',
        }));
    };

    const handleEditInputChange = (e: any) => {
        setState(prev => ({
            ...prev,
            editInputValue: e.target.value
        }));
    };

    const handleworkshopStatus = (workshopKey: any, workshopStatus: any) => {
        let params = {
            workshopKey: workshopKey,
            workshopStatus: workshopStatus === 1 ? 0 : 1
        };
        axios
            .post(Constants.G_API_URL + "workshops/changeStatus", params)
            .then(res => {
                if (res.data.status === 1) {
                    openNotification("success", "Workshop status changed successfully");
                } else
                    openNotification("error", "Workshop status could not be changed");
                fetchData();
                setState(prev => ({
                    ...prev,
                    loading: true,
                }));
            })
            .catch(error => {
                console.log(error)
            });
    };

    const handleEditInputConfirm = () => {
        const newUrls = [...state.videoUrls];
        newUrls[state.editInputIndex] = state.editInputValue;
        setState(prev => ({
            ...prev,
            videoUrls: newUrls,
            editInputIndex: -1,
            editInputValue: '',
        }));
    };

    const S3VideoUpload = async (preSignedData: any, data: any, path: any) => {
        const formData = new FormData();
        Object.entries(preSignedData.fields).forEach(([k, v]) => {
            // @ts-ignore
            formData.append(k, v);
        });
        formData.append("file", data);
        await axios.post(preSignedData.url, formData)
            .then(response => {
                var temp = state.uploadedVideos;
                temp.push("https://cdn.prograd.org/" + path);
                setState(prev => ({
                    ...prev,
                    uploadedVideos: temp
                }));
            }).catch((err) => {
                console.log(err)
            });
    };

    const S3ThumbnailUpload = async (preSignedData: any, data: any, path: any, submit: Function) => {
        const formData = new FormData();
        Object.entries(preSignedData.fields).forEach(([k, v]) => {
            // @ts-ignore
            formData.append(k, v);
        });
        formData.append("file", data);
        await axios.post(preSignedData.url, formData)
            .then(response => {
                console.log(response)
                const thumbnail = "https://cdn.prograd.org/" + path;
                setState(prev => ({
                    ...prev,
                    uploadedThumbnail: thumbnail
                }));
                submit(thumbnail)
            }).catch((err) => {
                console.log(err)
            });
    };

    const getPresignedUploadUrl = async (data: any, path: any) => {

        return await axios
            .get(`${Constants.G_API_URL}workshops/upload/url?fileName=${path}&fileType=${data.type !== "" ? data.type : "video/mp4"}`)
            .then(res => {
                return res.data.data;
            })
            .catch(error => {
                console.log(error);
                return 0;
            });
    };

    // const handleDownloadResponse = async (record: any) => {
    //     openNotification("warn", `Generating Excel Sheet...`);
    //     return await axios
    //         .get(`${Constants.G_API_URL}workshops/custom/answers?workshopKey=${record.workshopKey}`)
    //         .then(res => {
    //             if (res.data !== undefined && res.data.status === 1 && res.data.data.length > 0) {
    //                 let response: any = [];
    //                 res.data.data.forEach(function (entry: any) {
    //                     response.push({ ...{ "Email ": entry.email }, ...entry.customQuestions });
    //                 });
    //                 openNotification("success", `Excel Sheet Generated..`);
    //                 let csv_file = "";
    //                 jsonexport(response, function (err: any, csv: any) {
    //                     if (err) return console.error(err);
    //                     csv_file = csv;
    //                 });
    //                 let blob = new Blob([csv_file]);
    //                 // @ts-ignore
    //                 if (window.navigator.msSaveOrOpenBlob) {
    //                     window.navigator.msSaveBlob(blob, "studentResponse.csv");
    //                 } else {
    //                     let a = window.document.createElement("a");

    //                     // @ts-ignore
    //                     a.href = window.URL.createObjectURL(blob, {
    //                         type: "text/csv"
    //                     });
    //                     a.download = "studentResponse.csv";
    //                     document.body.appendChild(a);
    //                     a.click();
    //                     document.body.removeChild(a);
    //                 }
    //             } else if (res.data.status === 1 && res.data.data.length === 0) {
    //                 openNotification("error", `Data not available..`);
    //             } else
    //                 openNotification("error", `Unable to generate Excel Sheet...`);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             return 0;
    //         });
    // }

    const columns = [
        {
            title: "Workshop Title",
            dataIndex: "subject",
            width: '22%'
        },
        {
            title: "Status",
            dataIndex: "workshopStatus",
            width: '5%',
            render: (text: any, record: any) => <Switch defaultChecked={parseInt(text) === 1 ? true : false} onChange={() => handleworkshopStatus(record.workshopKey, record.workshopStatus)} />
        },
        {
            title: "Webinar Key",
            dataIndex: "workshopKey",
            width: '15%'
        },
        {
            title: "Webinar Mode",
            render: (text:any, record: any) => (<>{record.workshopMode === 0 ? 'V1' : 'V2'}</>),
            width: '10%'
        },
        {
            title: "Url Slug",
            dataIndex: "slug",
            width: '22%',
            ellipsis: true,
        },
        {
            title: "Registration Link",
            dataIndex: "registrationUrl",
            width: '20%',
            ellipsis: true,
        },
        {
            dataIndex: 'workshopID',
            width: '3%',
            render: (text: any, record: any) => (
                <i onClick={() => { handleUpdate(record.workshopKey, record.preview, record.slug, record.tag, record.workshopType, record.workshopPrice, record.workshopMode, record.recordingLinks !== undefined ? record.recordingLinks : [], record.workshopContent !== undefined ? { workshopContent: record.workshopContent } : {}, record.workshopThumbnail !== undefined ? record.workshopThumbnail : '', record.attendanceLimit !== undefined ? record.attendanceLimit : 0)}} className="icon icon-edit editBtn"></i>
            ),
        },
        {
            render: (text: any, record: any) => (
                <i onClick={() => {handleDelete(record)}} className="icon icon-trash deleteworkshopBtn"></i>
            ),
            width: '3%'
        },
    ];

    // const saveInputRef = (input: any) => (input = input);
    

    const { thumbnaillist, fileList } = state;
    const videoProps = {
        onRemove: (file: any) => {
            const index = state.fileList.indexOf(file);
            const newFileList = state.fileList.slice();
            newFileList.splice(index, 1);
            setState(prev => ({
                ...prev,
                fileList: newFileList,
            }));
        },
        beforeUpload: (file: any) => {
            setState(prev => ({
                ...prev,
                fileList: [...state.fileList, file],
            }));
            return false;
        },
        fileList,
    };
    const thumbnailProps = {
        onRemove: (file: any ) => {
            const index = state.thumbnaillist.indexOf(file);
            const newFileList = state.thumbnaillist.slice();
            newFileList.splice(index, 1);
            setState(prev => ({
                ...prev,
                thumbnaillist: newFileList,
            }));
        },
        beforeUpload: (file: any) => {
            setState(prev => ({
                ...prev,
                thumbnaillist: [...state.thumbnaillist, file],
            }));
            return false;
        },
        thumbnaillist,
    };

    return (
        <>
            <div className="container_div_workshop">
                <div className="head-wrapper f-d f-h-sb f-v-c">
                    <h3 className="page-heading">Workshop Landing Page</h3>
                    <div className="btn-wrapper f-d">
                        <Button className="default-blue-btn btn-small" onClick={()=>{downloadJson(0)}}>
                            Download Sample Json V1
                        </Button>
                        <Button className="default-blue-btn btn-small" onClick={()=>{downloadJson(1)}}>
                            Download Sample Json V2
                        </Button>
                        <Button className="default-blue-btn btn-small" onClick={addNewworkshop}>
                            Add New workshop
                        </Button>
                    </div>
                </div>
                <div className="workshop-table">
                    <Modal
                        className="add-workshop-modal"
                        footer={null}
                        centered
                        destroyOnClose={true}
                        visible={state.visible}
                        onCancel={() => {
                            handleClose();
                        }}
                        title={state.modalTitle}
                    >
                        <span className={state.updateMode}>This action will update any changes made in GoToworkshop to this instance</span>
                        <Spin tip={state.spinnerTxt} spinning={state.spinner}>
                            <Form className={"workshop-form"} onSubmit={e => {
                                e.preventDefault();
                                handleSubmit()
                            }}>

                                <Form.Item>
                                    <label>Workshop Key*</label>
                                    <Input placeholder="Enter webinar key" onChange={(e) => {handleKeyChange(e.currentTarget.value)}}
                                        type="text" disabled={state.readOnly}
                                        value={state.workshopKey} />
                                </Form.Item>
                                <Form.Item>
                                    <label>Preview Image Url*</label>
                                    <Input placeholder="Enter preview image url (to be shown on workshop listings page)" onChange={(e) => {handlePreviewChange(e.currentTarget.value)}} type="text"
                                        value={state.preview} />
                                </Form.Item>
                                <Form.Item>
                                    <label>Custom Slug</label>
                                    <Input placeholder="Enter custom slug" onChange={(e) => { handleslugChange(e.currentTarget.value)}}
                                        type="text" value={state.customSlug} />
                                    <span className="text-xsmall" style={{color: 'black'}}>Note: Default custom slug is generated based on the GTW workshop title</span>
                                </Form.Item>
                                {/* <Form.Item>
                                    <label>Enter Tags</label>
                                    <Input placeholder="Enter tags" onChange={(e) => {handletagsChange(e.currentTarget.value)}} type="text"
                                        value={state.tags} />
                                </Form.Item> */}
                                <Form.Item>
                                    <label>Workshop Type (Free/Paid)</label>
                                    <Select placeholder="Workshop Type" onChange={handleworkshopTypeChange}
                                        value={state.workshopType !== '' ? state.workshopType : undefined}>
                                        <Option value="free">Free</Option>
                                        <Option value="paid">Paid</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item>
                                    <label hidden={state.priceHidden}>Workshop Price*</label>
                                    <Input placeholder="Workshop Price (In Rs)" onChange={(e) => {handlepriceChange(e.currentTarget.value)}}
                                        type="number"
                                        hidden={state.priceHidden} value={state.price} />
                                </Form.Item>
                                <Form.Item>
                                    <label>Workshop Details Page Type</label>
                                    <Switch
                                        checkedChildren="V2"
                                        unCheckedChildren="V1"
                                        // defaultChecked
                                        onChange={(checked)=>{handleWorkshopModeChange(checked ? 1 : 0)}}
                                        checked={state.workshopMode !== 0}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <label>Workshop Content</label>
                                    <TextArea rows={4}
                                        placeholder='Paste Json data here'
                                        onChange={(e) => {handleJsonData(e.currentTarget.value)}}
                                        value={state.jsonData}
                                    />
                                </Form.Item>
                                <div className={state.updateMode + "videoUrls"}>
                                    {state.videoUrls.map((tag, index) => {
                                        if (state.editInputIndex === index) {
                                            return (
                                                <Input
                                                    ref={editInputRef}
                                                    key={tag}
                                                    size="small"
                                                    className="tag-input"
                                                    value={state.editInputValue}
                                                    onChange={handleEditInputChange}
                                                    onBlur={handleEditInputConfirm}
                                                    onPressEnter={handleEditInputConfirm}
                                                />
                                            );
                                        }

                                        const isLongTag = tag.length > 20;

                                        const tagElem = (
                                            <Tag
                                                className="edit-tag"
                                                key={tag}
                                                closable={index >= 0}
                                                onClose={() => handleTagClose(tag)}>
                                                <span
                                                    onDoubleClick={e => {
                                                        if (index >= 0) {
                                                            setState(prev => ({
                                                                ...prev,
                                                                editInputIndex: index,
                                                                editInputValue: tag
                                                            }))
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                                </span>
                                            </Tag>
                                        );
                                        return isLongTag ? (
                                            <Tooltip title={tag} key={tag}>
                                                {tagElem}
                                            </Tooltip>
                                        ) : (
                                            tagElem
                                        );
                                    })}
                                    {state.inputVisible && (
                                        <Input
                                            // ref={saveInputRef}
                                            type="text"
                                            size="small"
                                            className="tag-input"
                                            value={state.inputValue || ''}
                                            onChange={handleInputChange}
                                            onBlur={handleInputConfirm}
                                            onPressEnter={handleInputConfirm}
                                        />
                                    )}
                                    {!state.inputVisible && (
                                        <Button className="site-tag-plus uploadBtn" onClick={() => showInput()}>
                                            Add video by Url
                                        </Button>
                                    )}
                                </div>
                                <div className={state.updateMode}>
                                    <span>Uploaded Videos: {state.recordingLinks.length}</span><br />
                                    <Upload {...videoProps} accept='video/*'>
                                        <Button className="uploadBtn">
                                            Select Video File to upload
                                        </Button>
                                    </Upload>
                                </div>
                                <div className={state.updateMode}>
                                    <span>Uploaded Thumbnails: {state.recordingThumbnail === '' ? '0' : '1'}</span><br />
                                    <Upload {...thumbnailProps} accept='image/*'>
                                        <Button
                                            className="uploadBtn"
                                            disabled={thumbnaillist.length === 1}
                                        >
                                            Select Thumbnail Image
                                        </Button>
                                    </Upload>
                                </div>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        {state.actionBtnLabel}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Spin>
                    </Modal>
                    <Table
                        columns={columns}
                        dataSource={state.workshop_data}
                        loading={state.loading}
                        pagination={false}
                    />
                </div>
            </div>
            
            <style jsx>
                {`
                    .container_div_workshop {
                        margin: var(--peaky-gap-16) 0 0;
                    }
                    
                    .container_div_workshop .head-wrapper {
                        margin-bottom: var(--peaky-gap-16);
                    }

                    .container_div_workshop .head-wrapper .page-heading {
                        color: var(--carbon);
                    }

                    .container_div_workshop .default-blue-btn:not(:last-child) {
                        margin-right: var(--peaky-gap-16);
                    }


                    .add-workshop-modal {
                        width: 500px !important;
                    }
                    .add-workshop-modal .ant-input {
                        height: 50px !important;
                    }
                    .add-workshop-modal .ant-btn-primary {
                        width: 100%;
                        height: 50px !important;
                    }
                    .container_div_workshop .editBtn,
                    .container_div_workshop .deleteworkshopBtn,
                    .container_div_workshop .downloadUserResponse {
                        cursor: pointer;
                    }
                    .add-workshop-modal .uploadBtn {
                        margin-bottom: 20px;
                        height: 50px;
                    }

                    .ant-modal-header {
                        border-bottom: none;
                    }

                    .ant-modal-body {
                        padding: 0 24px 24px 24px;
                        max-height: 500px;
                        overflow-y: scroll;
                        overflow-x: hidden;
                    }

                    .workshop-form {
                        margin-top: 1rem;
                    }
                    .ant-btn:hover,
                    .ant-btn:focus,
                    .ant-btn-primary {
                        border-color: unset !important;
                    }
                    .videoUrls {
                        display: grid;
                    }
                    .add-workshop-modal form textarea.ant-input {
                        height: auto !important;
                        margin-bottom: 4px;
                    }
                `}
            </style>
        </>
    );
}

export default WorkshopsAdmin;
