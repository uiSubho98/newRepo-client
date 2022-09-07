import React from "react";
import explorer from "../../assets/icons/svg-icons-v2/explorer.svg";
import architect from "../../assets/icons/svg-icons-v2/architect.svg";
import commander from "../../assets/icons/svg-icons-v2/commander.svg";
import styled from "styled-components";
import HeroDesc from "./HeroDesc";

const HeroContainer = styled.div`
    margin-top: 96px;

    .hero-container {
        .left-container {
            width: 45%;

            .hero-img {
                height: 22rem;
            }
        }

        /* LEFT CONTAINER CSS END */

        .right-container {
            width: 45%;

            .title {
                font-family: "Inconsolata", sans-serif !important;
                color: var(--dove);
            }

            .profile-type {
                font-family: "Inconsolata", sans-serif !important;
                text-transform: uppercase;
                background: -webkit-linear-gradient(#0e7ded, #1739e6);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 72px;
                font-weight: 900;
            }
        }

        /* RIGHT CONTAINER CSS ENDS */
    }

    /* End for hero container */

    @media only screen and (max-device-width: 760px) {
        .hero-container {
            .left-container {
                width: 100%;
            }

            .right-container {
                width: 100%;

                .profile-type {
                    font-size: 48px;
                }
            }
        }

        .body-container .hero-container .right-container {
            margin-top: unset;
        }
        .body-container .hero-container .left-container .hero-img {
            width: 15rem;
            height: 15rem;
        }
        .body-container .hero-container .right-container .profile-type {
            font-size: 45px !important;
        }
    }
`;

interface IHeroProps {
    name: string;
    profile_type: string;
}

const Hero = (props: IHeroProps) => {
    const { name, profile_type } = props;
    let hero_img = "";
    let profile = "";
    if (profile_type !== undefined) {
        hero_img =
            parseInt(profile_type) === 1
                ? architect
                : parseInt(profile_type) === 2
                ? commander
                : explorer;
        profile =
            parseInt(profile_type) === 1
                ? "Architect"
                : parseInt(profile_type) === 2
                ? "Commander"
                : "Explorer";
    }

    return (
        <HeroContainer>
            <div className="hero-container lr-pad-d tb-pad-d lr-pad-m f-d f-vt-m f-h-sb">
                <div className="left-container">
                    <div
                        className="hero-img bg-image-full"
                        style={{ backgroundImage: "url(" + hero_img + ")" }}
                    ></div>
                </div>
                <div className="right-container">
                    <h1 className="title h1-heading">
                        {name} is{" "}
                        {profile_type !== undefined && parseInt(profile_type) === 2 ? "a" : "an"}{" "}
                    </h1>
                    <div className="profile-type">{profile}</div>
                    <HeroDesc profile_type={profile_type} name={name} />
                </div>
            </div>
        </HeroContainer>
    );
};

export default Hero;
