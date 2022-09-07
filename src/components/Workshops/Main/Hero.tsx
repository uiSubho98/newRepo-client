import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';

interface IHeroContent {
    title: string;
    image: string;
    mob_image: string;
}

interface IProps {
    data: IHeroContent;
    isSearching: boolean;
    search: Function;
}

const Hero = (props: IProps) => {
    const { data, search } = props;

    const [searchInput, setSearchInput] = useState<string>("");

    const handleChange = (value: string) => {
        setSearchInput(value);
        search(value);
    }

    let bgImage = data.image;

    if(isMobile) {
        bgImage = data.mob_image;
    }

    return (
        <>
            <div className="tb-pad-d lr-pad-d hero-content-wrapper bg-image-full">
                <div className="hero-img-wrapper w-100 hide-d">
                    <img src={bgImage} className="hero-img hide-d f-m w-100" alt="" />
                </div>
                <h1 className="font-heading text-xxl title lr-pad-m">
                    {data?.title}
                </h1>
                <div className="f-d f-v-c input-block lr-pad-m">
                    <Input className="input" placeholder="Search for workshops"
                    onChange={(e) => handleChange(e.target.value)}/>
                    <Button className="f-d f-v-c default-blue-btn 
                    btn-small search-btn"
                    onClick={() => search(searchInput)}>
                        <i className="icon icon-search"></i>
                    </Button>
                </div>
            </div>
            <style jsx>{`
                .hero-content-wrapper {
                    background-size: cover;
                    background-image: url(${bgImage});
                }

                .hero-content-wrapper .title {
                    margin: 82px 0 0;
                }

                .hero-content-wrapper .input-block
                .input::placeholder {
                    color: var(--dove);
                    opacity: 0.38;
                }

                .hero-content-wrapper .input-block
                .input {
                    background-color: #383838;
                    border-radius: var(--peaky-br-2) 0 0 var(--peaky-br-2);
                    color: var(--dove);
                    font-weight: 300;
                    height: 50px;
                    width: 350px;
                    padding: 0 var(--peaky-pad-16);
                }

                .hero-content-wrapper .input-block 
                .ant-input {
                    border: unset;
                    border-radius: unset;
                    font-size: 16px;
                }

                .hero-content-wrapper .input-block {
                    margin: var(--peaky-gap-24) 0 82px;
                }

                .hero-content-wrapper .input-block 
                .ant-input:focus {
                    box-shadow: none;
                    border: 2px solid var(--primary) !important;
                }
                
                .hero-content-wrapper .input-block
                .search-btn {
                    border-radius: 0 var(--peaky-br-2) var(--peaky-br-2) 0;
                    font-size: 25px;
                    height: 50px;
                    padding: 0 var(--peaky-pad-16);
                }
                .hero-content-wrapper .input-block .search-btn:hover {
                    color: inherit;
                }

                @media only screen and (max-device-width: 760px) {
                    .hero-content-wrapper {
                        background-image: none;
                        padding: 0;
                    }

                    .hero-content-wrapper .hero-img-wrapper {
                        display: inline-block;
                        width: 100%;
                        background: -moz-linear-gradient(to bottom, rgba(0, 0, 0, 0), #121212); /* FF3.6+ */
                        background: -webkit-gradient(linear, left bottom, right bottom, color-stop(0%, rgba(0, 0, 0)), color-stop(100%, #121212)); /* Chrome,Safari4+ */
                        background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%, #121212 100%); /* Chrome10+,Safari5.1+ */
                        background: -o-linear-gradient(top, rgba(0, 0, 0, 0) 0%, #121212 100%); /* Opera 11.10+ */
                        background: -ms-linear-gradient(top, rgba(0, 0, 0, 0) 0%, #121212 100%); /* IE10+ */
                        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #121212 100%); /* W3C */
                        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6000000', endColorstr='#00000000',GradientType=0 ); /* IE6-9 */
                    }

                    .hero-content-wrapper .title {
                        line-height: 50px;
                        margin: 0;
                    }

                    .hero-content-wrapper .input-block {
                        margin-bottom: var(--peaky-gap-24);
                    }
                }
            `}</style>
        </>
    )
}

export default Hero;