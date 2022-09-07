import axios from "axios";
import React, { useEffect , useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner/spinner";
import { G_API_URL } from "../../constants/constants";
import Hero from "../../components/Workshops/Main/Hero";
import { IState } from "../../interfaces/workshops";
import WorkshopsList from "../../components/Workshops/Main/WorkshopsList";
import Active from "../../components/Workshops/Main/Active";
import { __getEmail } from "../../utils/user-details.util";

const Workshops: React.FC = () => {
    const defaultState: IState = {
        isSearching: false,
        searchText: ""
    };
    const [state, setState] = useState<IState>(defaultState);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        axios.get(G_API_URL + "workshops/?email=" + __getEmail())
        .then(response => {
            response = response.data;
            if(response.status === 1) {
                setState(response.data);
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);
        });
    }, [])

    const searchWorkshops = (subject: string) => {
        setState(prev => ({
            ...prev,
            isSearching: true,
            searchText: subject
        }));
        axios.get(G_API_URL + "workshops/search?subject=" + subject)
        .then((response:any) => {
            response = response.data;
            if(response.status === 1) {
                setState(prev => ({
                    ...prev,
                    isSearching: false,
                    active: response.data.active,
                    upcoming: response.data.upcoming,
                    past: response.data.past
                }));
                setLoading(false);
            } else {
                setState(prev => ({
                    ...prev,
                    isSearching: false
                }));
            }
        }).catch(err => {
            console.log(err);
        });
    }

    const { heroContent, active, upcoming, past, isSearching } = state;

    return (
        <>
            {
                !isLoading ?
                    <Layout footer={true}>
                        <Helmet>
                            <title>ProGrad | Workshops</title>
                        </Helmet>
                        {
                            heroContent &&
                            <Hero data={heroContent} search={searchWorkshops} isSearching={isSearching} />
                        }
                        {
                            active && active.length > 0 &&
                            <Active data={active} />
                        }
                        {
                            upcoming && upcoming.list.length > 0 &&
                            <WorkshopsList data={upcoming} type={0} />
                        }
                        {
                            past && past.list.length > 0 &&
                            <WorkshopsList data={past} type={1} />
                        }
                        {
                            active && active.length === 0 && upcoming && upcoming.list.length === 0 && past && past.list.length === 0 && state.searchText && state.searchText !== "" &&
                            <div className="search-zero-state lr-pad-d lr-pad-m tb-pad-d tb-pad-m text-c-d">We’re sorry! There are no webinars matching your query</div>
                        }
                    </Layout> :
                    <Spinner />
            }
            <style jsx>
                {`
                .search-zero-state {
                    color: rgba(255, 255, 255, 0.54) !important;
                }
                
                @media only screen and (max-device-width: 760px) {
                }
            `}
            </style>
        </>
    )
}

export default Workshops;