import React from 'react'
import Header from "../../components/Header";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import AdminExperiences from "./AdminExperiences";
import { useSelector } from "react-redux";
import { Tabs } from 'antd';
import AdminProjects from './AdminProjects';
const { TabPane } = Tabs;
function Admin() {
    const { portfolioData } = useSelector((state) => state.root);
    return (
        <div>
            <Header />
            {portfolioData && <div className='mt5 p-5'>
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="Introduction" key="1">
                        <AdminIntro />
                    </TabPane>
                    <TabPane tab="About" key="2">
                        <AdminAbout />
                    </TabPane>
                    <TabPane tab="Experiences" key="3">
                        <AdminExperiences />
                    </TabPane>
                    <TabPane tab="Projects" key="4">
                        <AdminProjects />
                    </TabPane>
                </Tabs>
            </div>}
        </div>
    )
}

export default Admin