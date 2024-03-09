import { Form, Modal, message } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';

function Experiences() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { experiences } = portfolioData;
    const [showAddEditModel, setShowAddEditModel] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
    const [type, setType]=React.useState("add");
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            let response;

            if (selectedItemForEdit) {
                response = await axios.post("api/portfolio/update-experience", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            } else {
                response = await axios.post("api/portfolio/add-experience", values);
            }

            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                setShowAddEditModel(false);
                setSelectedItemForEdit(null);
                dispatch(HideLoading());
                dispatch(ReloadData(true));

            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }


    const onDelete = async (item) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("api/portfolio/delete-experience", { _id: item._id });
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    return (
        <div>
            <div className='flex justify-end'>
                <button className='bg-primary px-5 py-2 text-white'
                    onClick={() => {
                        setSelectedItemForEdit(null);
                        setShowAddEditModel(true);
                    }}
                >Add Experience</button>
            </div>
            <div className='grid grid-cols-4 gap-5 mt-5'>
                {experiences.map((experience) => (
                    <div className='shadow boder p-5 border-gray-400 flex flex-col'>
                        <h1 className='text-primary text-xl font-bold'>{experience.period}</h1>
                        <hr />
                        <h1>Company: {experience.company}</h1>
                        <h1>Role: {experience.title}</h1>
                        <h1>{experience.description}</h1>
                        <div className='flex justify-end gap-5 mt-5'>
                            <button className='bg-secondary text-primary px-5 py-2 rounded-md'
                                onClick={() => {
                                    onDelete(experience);
                                }}
                            >Delete</button>
                            <button className='bg-primary text-white px-5 py-2 rounded-md'
                                onClick={() => {
                                    setSelectedItemForEdit(experience);
                                    setShowAddEditModel(true);
                                    setType("edit");
                                }}
                            >Edit</button>

                        </div>
                    </div>
                ))}
            </div>

            {(type === "add" || selectedItemForEdit) && (
                 <Modal visible={showAddEditModel}
                 title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
                 footer={null}
                 onCancel={() => {
                     setShowAddEditModel(false);
                 setSelectedItemForEdit(null);
                 }}>
                 <Form layout='vertical' onFinish={onFinish} initialValues={selectedItemForEdit}>
                     <Form.Item name="period" label="Period">
                         <input placeholder='Enter Period Here..' />
                     </Form.Item>
                     <Form.Item name="company" label="Company">
                         <input placeholder='Enter Company Name Here..' />
                     </Form.Item>
                     <Form.Item name="title" label="Title">
                         <input placeholder='Enter Title Here..' />
                     </Form.Item>
                     <Form.Item name="description" label="Job Description">
                         <input placeholder='Enter Description Here..' />
                     </Form.Item>
                     <div className='flex justify-end '>
                         <button className='px-5 py-2 border-primary text-primary' onClick={() => {
                             setShowAddEditModel(false);
                             setSelectedItemForEdit(null);
                         }} >Cancel</button>
                         <button className='px-5 py-2 bg-primary text-white' >
                             {selectedItemForEdit ? "Update" : "Add"}
                         </button>
                     </div>
                 </Form>
             </Modal>
            )}

        </div>
    )
}

export default Experiences