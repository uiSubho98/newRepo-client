import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { __getToken } from '../../utils/user-details.util';
import { LoadingOutlined } from '@ant-design/icons';
import { LEARN_PLAT_URL } from '../../constants/constants';

interface CreatorAdminProps {
    
}

const CreatorAdmin = (props: CreatorAdminProps) => {
    useEffect(()=>{
        (document.getElementById('learning_redirect') as HTMLFormElement).submit();
    });

    return (
        <>
            <div className="f-d f-h-c f-v-c">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
            </div>
            <form
                key={'redirect'}
                method="POST"
                action={LEARN_PLAT_URL+'auth/'}
                name="learning_redirect"
                id="learning_redirect"
            >
                <input
                    className="hidden"
                    type="hidden"
                    name="t"
                    placeholder="entity"
                    value="set_token"
                />
                <input
                    className="hidden"
                    type="hidden"
                    name="token"
                    placeholder="token"
                    value={__getToken()}
                />
                <input
                    className="hidden"
                    type="hidden"
                    name="r_path"
                    placeholder="r_path"
                    value="creator/admin/"
                    id="r_path"
                />
            </form>
        </>
    );
}

export default CreatorAdmin;
