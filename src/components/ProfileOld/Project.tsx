import { DeploymentUnitOutlined } from '@ant-design/icons';
import React from 'react';
import { IProject } from './profile';

interface IProjectProps {
    data: IProject
}

const Project = (props: IProjectProps) => {
    const { data } = props;
    return (
        <>
            <div className="project-wrapper">
                <div className="project-header f-d f-h-sb">
                    <div className="title c-pointer" onClick={()=>{window.open(data.previewLink, '_blank')}}>
                        <DeploymentUnitOutlined className="body-small" /><span className="project-name body-regular">{data.name}</span>
                    </div>
                    <span className="body-caption">{ data.isPinned && <div>Pinned</div> }</span> 
                </div>
                {
                    data.previewThumb 
                    ?
                    <img src={data.previewThumb} alt={`Playground-${data.name}`} width="100%" className="project-thumb"/>
                    :
                    <div className="project-desc body-caption">{data.desc}</div>
                }
                <div className="project-type">{data.type}</div>
            </div>
        </>
    )
}

export default Project;