import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import Layout from '../../components/Layout';
import { check_login } from '../../utils/login.util';
import { G_URL } from '../../constants/constants';
import { decodeToken } from '../../utils/user-details.util';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import Registrations from '../../components/Admin/Registrations';
import CreatorAdmin from '../../components/Admin/CreatorAdmin';
import BootcampCoupons from '../../components/Admin/BootcampCoupons/BootcampCoupons';
import WorkshopCoupons from '../../components/Admin/WorkshopCoupons/WorkshopCoupons';
import BatchManagement from '../../components/Admin/BatchManagement/BatchManagement';
import WorkshopsAdmin from '../../components/Admin/Workshops/WorkshopsAdmin';
import RedirectForm from '../../components/BootcampDashboard/RedirectForm';

interface AdminProps {
    
}

interface AdminState {

}

const Admin = (props: AdminProps) => {
    // Admin access check 
    useEffect(()=> {
        // Check if user is logged in
        if(!check_login()) {
            window.location.href = G_URL+'login'
        }
        // Check if user type if not 9
        if(decodeToken().userType !== 9) {
            window.location.href = G_URL+'forbidden'
        }
    });

    const redirect = (r_path: string) => {
        // Update the value of r_path
        (document.getElementById('r_path') as 
        HTMLInputElement).value = r_path;
        (document.getElementById('learning_redirect') as 
        HTMLFormElement).submit();
    }

    const [openKeys, setOpenKeys] = useState<Array<string>>([]);
    const rootSubmenuKeys = ['accounts'];
    const onOpenChange = (opKeys: Array<string>) => {
        const latestOpenKey = opKeys.find((key:string) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(opKeys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    const [activeMenu, setActiveMenu] = useState<string>('workshops');

    return (
        <>
            <Layout>
                <div className="admin-container f-d">
                    <div className="menu-container">
                        <Menu
                            mode="inline"
                            openKeys={openKeys}
                            onOpenChange={onOpenChange}
                            style={{ width: 256 }}
                        >
                            {/* <SubMenu key="accounts" title="Accounts">
                                <Menu.Item key="1" onClick={() => setActiveMenu('registrations')}>Registrations</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="2" onClick={() => setActiveMenu('batch-management')}>Batch Management</Menu.Item>
                            <Menu.Item key="3" onClick={() => setActiveMenu('creator-admin')}>Creator Admin</Menu.Item> */}
                            <Menu.Item key="1" onClick={() => {window.open(G_URL+'vision/admin/freeclass/calendar', '_blank')}}>Vision Dashboard</Menu.Item>
                            <Menu.Item key="2" onClick={() => {window.open(G_URL+'admin/liveclass/calendar', '_blank')}}>Live Class Management</Menu.Item>
                            <Menu.Item key="3" onClick={() => {window.open(G_URL+'odin', '_blank')}}>Odin</Menu.Item>
                            <Menu.Item key="4" onClick={() => {window.open(G_URL+'poseidon', '_blank')}}>Poseidon</Menu.Item>
                            <SubMenu key="coupons" title="Coupons Management">
                                <Menu.Item key="5" onClick={() => {redirect('creator/coupons/?access_key=IADDCOUPONSBECAUSEICAN')}}>Microdegree Coupons</Menu.Item>
                                <Menu.Item key="6" onClick={() => setActiveMenu('bootcamp-coupons')}>Bootcamp Coupons</Menu.Item>
                                <Menu.Item key="7" onClick={() => setActiveMenu('workshop-coupons')}>Workshop Coupons</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="8" onClick={() => {setActiveMenu('workshops')}}>Workshops</Menu.Item>
                        </Menu>
                    </div>
                    <div className="data-container w-100">
                        {activeMenu === 'registrations' && <Registrations />}
                        {activeMenu === 'creator-admin' && <CreatorAdmin />}
                        {activeMenu === 'bootcamp-coupons' && <BootcampCoupons />}
                        {activeMenu === 'workshop-coupons' && <WorkshopCoupons />}
                        {activeMenu === 'batch-management' && <BatchManagement />}
                        {activeMenu === 'workshops' && <WorkshopsAdmin />}
                    </div>
                </div>
                <RedirectForm />
            </Layout>

            <style jsx>
                {`
                    body {
                        background-color: var(--dove);
                    }
                    .admin-container .data-container {
                        margin-left: var(--peaky-gap-32);
                        margin-right: var(--peaky-gap-16);
                    }
                `}
            </style>
        </>
    );
}

export default Admin;
