import React,{ useEffect ,useState } from "react";
// @ts-ignore
import { Helmet } from 'react-helmet';
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner/spinner";
import BookingSlots from "../../components/Workshop/BookingSlots";
import BookingSuccess from "../../components/Workshop/BookingSuccess";
import { G_API_URL } from "../../constants/constants";
import axios from "axios";

interface IContent {
    title?: string;
    description?: string;
    source?: string;
}

const Booking = () => {
    let defaultState: IContent = {
        title: "",
        description: "",
        source: ""
    }
    const [ content, setContent ] = useState<IContent>(defaultState);
    const [ isLoading, setLoading ] = useState<boolean>(false);
    let searchQuery = window.location.search;
    let urlParams = new URLSearchParams(searchQuery);
    let isBookingConfirmed = false;
    let email = urlParams.get('invitee_email');
    if(urlParams.get("assigned_to") && email) {
        isBookingConfirmed = true;
    }
    useEffect(() => {
        const fetchContent = () => {
            setLoading(true);
            axios.get(G_API_URL+"resource/workshop/")
            .then(response => {
                response = response.data;
                if(response.status === 1) {
                    setContent(response.data.bookingContent);
                    setLoading(false);
                }
            })
        }

        fetchContent();
    },[]);

    return (
        <Layout redirectDisable={true} navAction={'Account'}>
            <Helmet>
                <title>ProGrad | Workshop Booking</title>
            </Helmet>
            <div className="lr-pad-d lr-pad-m tb-pad-d tb-pad-m">
                {
                    !isLoading && !isBookingConfirmed?
                    <BookingSlots bookingContent={content} /> :
                    !isLoading && isBookingConfirmed ?
                    <BookingSuccess /> :
                    <Spinner />
                }
            </div>
        </Layout>
    )
}

export default Booking;