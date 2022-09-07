import React, { Suspense, useEffect } from 'react';

// @ts-ignore
import { lazy } from '@loadable/component';
// @ts-ignore
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { render } from 'react-dom';
// @ts-ignore
import { Provider } from 'react-redux';
import "./custom-icons.css";
import "antd/dist/antd.css";
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './config/store';
import ScrollToTop from './utils/scrollToTop';
// @ts-ignore
import { createBrowserHistory } from 'history';
import { GA_MEASUREMENT_ID } from './constants/constants';
import Spinner from './components/Spinner/spinner';
import { __setCookie } from './utils/cookie.util';
import { getScript } from './utils/common.util';
import VerifyAccount from './pages/Authentication/VerifyAccount';
import ActivationMobile from './pages/Onboard/ActivationMobile';
import SSOLogin from './pages/SSO/ssoLogin';

// @ts-ignore
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import ContactPage from './newPages/ContactPage/ContactPage';
import Enterprise from './newPages/Enterprise/Enterprise';
import EnterpriseForm from './newPages/EnterpriseForm/EnterpriseForm';



const Home = lazy(() => import('./pages/Home/Home'));
const newhome = lazy(() => import('./newPages/newHome/Home'));
const Login = lazy(() => import('./pages/Login/LoginV2'));
const ChangePassword = lazy(() => import('./pages/Authentication/ChangePassword'));
const ResetPassword = lazy(() => import('./pages/Authentication/ResetPassword'));
const Onboard = lazy(() => import('./pages/Onboard/Onboard'));
const Walkthrough = lazy(() => import('./pages/Onboard/Walkthrough'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Project = lazy(() => import('./pages/Project/Project'));
const MicroDegree = lazy(() => import('./pages/MicroDegree/MicroDegree'));
const Bootcamp = lazy(() => import('./pages/Bootcamp/Bootcamp'));
const FreeBootcamp = lazy(() => import('./pages/FreeBootcamp/FreeBootcamp'));
const Certificate = lazy(() => import('./pages/Certificate/Certificate'));
const Booking = lazy(() => import('./pages/Booking/Booking'));
const Payment = lazy(() => import('./pages/Payment/Payment'));
const Checkout = lazy(() => import('./pages/Payment/Checkout'));
const PaymentSuccess = lazy(() => import('./pages/Payment/PaymentSuccess'));
const Terms = lazy(() => import('./pages/Terms/Terms'));
const Policy = lazy(() => import('./pages/Policy/Policy'));
const Agreement = lazy(() => import('./pages/Agreement/Agreement'));
const ContactUs = lazy(() => import('./pages/ContactUs/ContactUs'));
const ApplicationTracker = lazy(() => import('./pages/ApplicationTracker/ApplicationTracker'));
const Default403 = lazy(() => import('./pages/Default/Default403'));
const Default404 = lazy(() => import('./pages/Default/Default404'));
const Admin = lazy(() => import('./pages/Admin/Admin'));
const VisionBooking = lazy(() => import("./pages/Vision/Booking"));
const VisionClassroom = lazy(() => import("./pages/Vision/Admin/Classroom/classroom"));
const VisionRecording = lazy(() => import("./pages/Vision/Admin/Classroom/Recordings"));
const VisionAdminCalendar = lazy(() => import("./pages/Vision/Admin/calendar"));
const VisionProject = lazy(() => import("./pages/Vision/Project"));
const VisionCertificate = lazy(() => import("./pages/Vision/Certificate"));
const VisionReport = lazy(() => import("./pages/Vision/Reports"));
const VisionAdmin = lazy(() => import("./pages/Vision/Admin/registrations"));
const JoinLink = lazy(() => import("./pages/Vision/JoinLink/join"));
const ShortLinkRedirect = lazy(() => import("./pages/Vision/ShortLinkRedirect"));
const Recordings = lazy(() => import("./pages/Recordings/Recordings"));
const VisionRecordingsList = lazy(() => import("./pages/Recordings/RecordingsList"));
const WhatsApp = lazy(() => import("./pages/ProgradEdge/ProgradEdge"));
const PlayGround = lazy(() => import("./pages/PlayGround/PlayGround"));
const PlayGroundView = lazy(() => import("./pages/PlayGround/PlayGroundView"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
// const SetupProfile = lazy(() => import("./pages/Profile/SetupProfile"));
// const EditProfile = lazy(() => import("./pages/Profile/EditProfile")); 
const VisionMeme = lazy(() => import("./pages/Vision/Meme"));
const RecordingPlayer = lazy(() => import("./pages/RecordingPlayer/RecordingPlayer"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const SocialConfirmation = lazy(() => import("./pages/SocialConfirmation/SocialConfirmation"));
const CareerServices = lazy(() => import('./pages/CareerServices/CareerServices'));
const EnrollmentForm = lazy(() => import("./pages/EnrollmentForm/EnrollmentForm"));
const DataDashboard = lazy(() => import("./pages/DataDashboard/index"));
const Workshops = lazy(() => import("./pages/Workshops/Workshops"));
const Poseidon = lazy(() => import("./pages/Poseidon/Poseidon"));
const WorkshopDetailV2 = lazy(() => import("./pages/Workshops/WorkshopDetailV2"));
const WorkshopConfirmation = lazy(() => import("./pages/Workshops/WorkshopConfirmation"));
const Programs = lazy(() => import("./pages/Programs/Programs"));
const ProgramInfo = lazy(() => import("./pages/ProgramInfo/ProgramInfo"));
const TalentSolutions = lazy(() => import("./pages/TalentSolutions/TalentSolutions"));
const ApplicationSuccess = lazy(() => import("./pages/ApplicationSuccess/ApplicationSuccess"));
const JobsBoard = lazy(() => import("./pages/JobsBoard/JobsBoard"));


const history = createBrowserHistory();

function App() {

       useEffect(() => {
              // Initialize GTM
              // const tagManagerArgs = {
              //     gtmId: GTM_TRACK_ID,
              // };
              // GoogleTagManager.initialize(tagManagerArgs);

              // Initialize GA
              // ReactGA.initialize(GA_TRACK_ID);
              // ReactGA.pageview(window.location.pathname + window.location.search);
              // <!-- Global site tag (gtag.js) - Google Analytics -->
              if (process.env.REACT_APP_PLATFORM === 'prod') {
                     const script1 = getScript(true);
                     script1.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
                     document.head.appendChild(script1);
                     const script2 = getScript();
                     script2.innerHTML = "window.dataLayer = window.dataLayer || [];\n" +
                            "function gtag(){dataLayer.push(arguments);}\n" +
                            "gtag('js', new Date());\n" +
                            "gtag('config', '" + GA_MEASUREMENT_ID + "');";
                     document.head.appendChild(script2);
                     // Clear console
                     console.clear();
              }
              let urlParams = new URLSearchParams(window.location.search);
              let utm_source = urlParams.get('utm_source');
              let utm_medium = urlParams.get('utm_medium');
              let utm_campaign = urlParams.get('utm_campaign');
              let utm_term = urlParams.get('utm_term');
              let utm_content = urlParams.get('utm_content');
              if (utm_source !== null) {
                     __setCookie('utm_source', utm_source);
              }
              if (utm_medium !== null) {
                     __setCookie('utm_medium', utm_medium);
              }
              if (utm_campaign !== null) {
                     __setCookie('utm_campaign', utm_campaign);
              }
              if (utm_term !== null) {
                     __setCookie('utm_term', utm_term);
              }
              if (utm_content !== null) {
                     __setCookie('utm_content', utm_content);
              }
       }, []);

       return (
              <Provider store={store}>
                     <Suspense fallback={<Spinner />}>
                            <Switch history={history}>
                                   <Route exact path={`${process.env.PUBLIC_URL}/rh/:slug1/:slug2`} component={ShortLinkRedirect} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/rw/:slug1/:slug2`} component={ShortLinkRedirect} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/rc/:slug1/:slug2`} component={ShortLinkRedirect} />

                                   <Route exact path={`${process.env.PUBLIC_URL}/m/:uid`} component={ShortLinkRedirect} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/f/:uid`} component={ShortLinkRedirect} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/p/:uid`} component={ShortLinkRedirect} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/r/:uid`} component={ShortLinkRedirect} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/c/:uid`} component={ShortLinkRedirect} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/book`} component={ShortLinkRedirect} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/resc/:slug`} component={ShortLinkRedirect} />

                                   <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/sso`} component={SSOLogin}/>      
                                   <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/signup`} component={Signup} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/signup/linkedin`} component={LinkedInPopUp} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/social-confirmation`} component={SocialConfirmation} />
                                   {/* <Route exact path={`${process.env.PUBLIC_URL}/create-password`} component={CreatePassword}/> */}
                                   <Route exact path={`${process.env.PUBLIC_URL}/change-password`} component={ChangePassword} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/forgot-password`} component={ResetPassword} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/register/`} component={Onboard} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/enroll/:slug`} component={Onboard} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/onboard/`} component={Walkthrough} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/verify/`} component={VerifyAccount} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/learning-dashboard/:slug`} component={Dashboard} />
                                   {/* <Route exact path={`${process.env.PUBLIC_URL}/learning-dashboard/microdegree`} component={MicrodegreeDashboard} />
                    <Route exact path={`${process.env.PUBLIC_URL}/learning-dashboard/bootcamp`} component={BootcampDashboard} /> */}
                                   <Route exact path={`${process.env.PUBLIC_URL}/booking/:slug`} component={Booking} />
                                   {/* <Route exact path={`${process.env.PUBLIC_URL}/booking/workshop`} component={WorkshopBooking} /> */}
                                   <Route exact path={`${process.env.PUBLIC_URL}/project/:slug`} component={Project} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/microdegree`} component={MicroDegree} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/career-services`} component={CareerServices} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/bootcamp/`} 
                                          component={() => <Redirect to='/bootcamp/MERN-Full-stack-development-part-time/' />} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/bootcamp/MERN-Full-stack-development/`}
                                        component={() => <Redirect to='/bootcamp/MERN-Full-stack-development-part-time/' />} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/bootcamp/MERN-Full-stack-development/part-time`}
                                          component={() => <Redirect to='/bootcamp/MERN-Full-stack-development-part-time/' />} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/bootcamp/MERN-Full-stack-development/full-time`}
                                         component={() => <Redirect to='/bootcamp/MERN-Full-stack-development-full-time/' />} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/bootcamp/:slug`}
                                         component={Bootcamp} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/free/bootcamp`} component={FreeBootcamp} />
                                   {/* <Route exact path={`${process.env.PUBLIC_URL}/workshop`} component={Workshop} /> */}
                                   <Route exact path={`${process.env.PUBLIC_URL}/recordings`} component={Recordings} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/certificate/:programType/:slug`}
                                          component={Certificate} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/payment/:slug`} component={Payment} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/checkout`} component={Checkout} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/payment/success/:slug`} component={PaymentSuccess} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/privacy-policy/`} component={Policy} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/terms-and-conditions/`} component={Terms} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/terms-and-conditions/:slug/`} component={Agreement} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/contact-us/`} component={ContactUs} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/application-tracker/`}
                                          component={ApplicationTracker} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/whatsapp/`}
                                          component={() => <Redirect to='/prograd-buzz/' />} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/prograd-buzz/`} component={WhatsApp} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/forbidden/`} component={Default403} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/admin/`} component={Admin} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/vision/admin/:slot_type/calendar`}
                                          component={VisionAdminCalendar} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/vision/mentor/:slot_type/register`}
                                          component={(props: any) => <VisionAdmin {...props} type={"mentor"} />} />

                                   <Route exact path={`${process.env.PUBLIC_URL}/odin`} component={DataDashboard} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/poseidon/`} component={Poseidon} />

                                   <Route exact path={`${process.env.PUBLIC_URL}/admin/:slot_type/calendar`}
                                          component={VisionAdminCalendar} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/admin/:slot_type/register`}
                                          component={(props: any) => <VisionAdmin {...props} type={"admin"} />} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/admin/:slot_type/classroom`}
                                          component={(props: any) => <VisionClassroom {...props} type={"admin"} />}  show={false}/>
                                   <Route exact path={`${process.env.PUBLIC_URL}/mentor/:slot_type/register`}
                                          component={(props: any) => <VisionAdmin {...props} type={"mentor"} />} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/mentor/:slot_type/classroom`}
                                          component={(props: any) => <VisionClassroom {...props} type={"mentor"} />} show={false} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/admin/:slot_type/recordings`}
                                          component={(props: any) => <VisionRecording {...props} type={"admin"} />} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/mentor/:slot_type/recordings`}
                                          component={(props: any) => <VisionRecording {...props} type={"mentor"} />} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/admin/:slot_type/recordings/:slug`}
                                          component={(props: any) => <VisionRecordingsList {...props} type={"admin"} />} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/mentor/:slot_type/recordings/:slug`}
                                          component={(props: any) => <VisionRecordingsList {...props} type={"mentor"} />} />

                                   <Route exact path={`${process.env.PUBLIC_URL}/vision/admin/:slot_type/register`}
                                          component={(props: any) => <VisionAdmin {...props} type={"admin"} />} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/vision/admin/:slot_type/classroom`}
                                          component={(props: any) => <VisionClassroom {...props} type={"admin"} show={true} />} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/vision/mentor/:slot_type/classroom`}
                                          component={(props: any) => <VisionClassroom {...props} type={"mentor"} show={true} />} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/vision/admin/:slot_type/recordings`}
                                          component={(props: any) => <VisionRecording {...props} type={"admin"} />} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/vision/mentor/:slot_type/recordings`}
                                          component={(props: any) => <VisionRecording {...props} type={"mentor"} />} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/vision/admin/:slot_type/recordings/:slug`}
                                          component={(props: any) => <VisionRecordingsList {...props} type={"admin"} />} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/vision/mentor/:slot_type/recordings/:slug`}
                                          component={(props: any) => <VisionRecordingsList {...props} type={"mentor"} />} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/activation/mobile`}
                                          component={ActivationMobile} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/vision/booking/:slug`}
                                          component={VisionBooking} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/vision/report/:slug`} component={VisionReport} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/vision/report/:slug/share/`}
                                          component={VisionReport} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/vision/certificate/:slug`}
                                          component={VisionCertificate} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/vision/project/:slug`}
                                          component={VisionProject} />

                                   <Route exact path={`${process.env.PUBLIC_URL}/vision/meme/:slug`}
                                          component={VisionMeme} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/mentor/join/:slot_type/:slotid/`}
                                          component={(props: any) => <JoinLink type={"mentor"} {...props} />} />

                                   <Route exact path={`${process.env.PUBLIC_URL}/student/join/:slot_type/:slotid/:uid`}
                                          component={(props: any) => <JoinLink type={"student"} {...props} />} />

                                   <Route exact path={`${process.env.PUBLIC_URL}/playground`}
                                          component={() => <Redirect to='/playground/new' />} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/playground/:pid`} component={PlayGround} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/playground/view/:pid`} component={PlayGroundView} />
                                   {/* <Route exact path={`${process.env.PUBLIC_URL}/profile/edit`} component={EditProfile} /> */}
                                   {/* <Route exact path={`${process.env.PUBLIC_URL}/profile/:uid`} component={Profile} /> */}
                                   <Route exact path={`${process.env.PUBLIC_URL}/profile/`} component={Profile} />
                                   {/* <Route exact path={`${process.env.PUBLIC_URL}/setup-profile`} component={SetupProfile} /> */}
                                   <Route exact path={`${process.env.PUBLIC_URL}/recording/player/:slug`} component={RecordingPlayer} />
                                   {/* <Route exact path={`${process.env.PUBLIC_URL}/settings`} component={Settings} /> */}
                                   <Route exact path={`${process.env.PUBLIC_URL}/enrollment-form`} component={EnrollmentForm} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/workshops/`} component={Workshops} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/workshops/:slug`} component={WorkshopDetailV2} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/workshop/register/success`} component={WorkshopConfirmation} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/programs`} component={Programs} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/program/:slug`} component={ProgramInfo} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/enterprises`} component={TalentSolutions} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/application/success`} component={ApplicationSuccess} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/jobsboard`} component={JobsBoard} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/aboutus`} component={newhome} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/contact`} component={ContactPage} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/enterprise`} component={Enterprise} />
                                   <Route exact path={`${process.env.PUBLIC_URL}/enterprise/form`} component={EnterpriseForm} />
                                   <Route exact component={Default404} />
                            </Switch>
                     </Suspense>
              </Provider>
       )
}

render(
       <Router>
              <ScrollToTop />
              <App />
       </Router>,
       document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();