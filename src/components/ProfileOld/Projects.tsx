import React, { useState, useEffect } from 'react';
import Project from './Project';
import { IProject } from './profile';

interface IProjectsProps {
    projects: Array<IProject>
}

const Projects = (props: IProjectsProps) => {
    var { projects } = props;
    const [projs, updateProjs] = useState<Array<IProject>>(projects.slice(0, 6));
    const [showAll, toggleShowAll] = useState<Boolean>(false);
    
    useEffect(() => {
        if(!showAll) {
            updateProjs(projects.slice(0, 6));
        } else {
            updateProjs(projects);
        }
    }, [showAll, projects]);

    return (
        <>
            <div className="projects-wrapper w-100">
                <div className="projects-header f-d f-h-sb">
                    <h2 className="h2-heading">Projects</h2>
                    {
                        showAll ? <span className="c-pointer" onClick={() => {toggleShowAll(false)}}>Show Less</span> : <span className="c-pointer" onClick={() => {toggleShowAll(true)}}>Show All</span>
                    }
                </div>
                <div className="projects-container g-d g-col-2 g-col-1-m">
                    {projs.map((project: IProject, index: number) => <Project data={project} key={index}/>)}
                </div>
            </div>
            <style jsx>
            {`
                .projects-wrapper {
                    margin-top: var(--peaky-gap-64);
                    
                }

                .projects-wrapper .projects-container {
                    grid-column-gap: 2rem;
                    grid-row-gap: 1.5rem;
                }

                .projects-wrapper .project-wrapper {
                    border-radius: 10px;
                    border: solid 1px #848484;
                    padding: var(--peaky-gap-16) var(--peaky-gap-32);
                }

                .projects-wrapper .project-wrapper .project-name {
                    color: var(--purple);
                    margin-left: var(--peaky-gap-4);
                    font-weight: 600;
                }

                .projects-wrapper .project-wrapper .project-desc {
                    margin: var(--peaky-gap-8) 0;
                }

                .projects-wrapper .project-wrapper .project-thumb {
                    border: solid 1px var(--granite);
                }

                @media only screen and (max-device-width: 760px) {
                    .projects-wrapper {
                        margin-top: var(--peaky-gap-24);
                    }
                }

                @media screen and (min-width: 768px) and (max-width: 1023px) and (orientation: portrait) {
                    .projects-wrapper {
                        margin-top: var(--peaky-gap-32);
                    }

                    .projects-wrapper .projects-container {
                        grid-template-columns: 1fr;
                    }
                }
            `}
            </style>
        </>
    )
}

export default Projects;