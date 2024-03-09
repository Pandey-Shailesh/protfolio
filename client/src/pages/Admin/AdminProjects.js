import { Form, Modal, message } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';

function AdminProjects() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { projects } = portfolioData;
    const [showAddEditModel, setShowAddEditModel] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
    const [type, setType]=React.useState("add");
    const onFinish = async (values) => {
        const tempTechnologies =values?.technologies?.split(",") || [];
        values.technologies =tempTechnologies;
        try {
            dispatch(ShowLoading());
            let response;

            if (selectedItemForEdit) {
                response = await axios.post("api/portfolio/update-project", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            } else {
                response = await axios.post("api/portfolio/add-project", values);
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
            const response = await axios.post("api/portfolio/delete-project", { _id: item._id });
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
                >Add Project</button>
            </div>
            <div className='grid grid-cols-3 gap-5 mt-5'>
                {projects.map((project) => (
                    <div className='shadow boder p-5 border-gray-400 flex flex-col'>
                        <h1 className='text-primary text-xl font-bold'>{project.title}</h1>
                        <hr />
                        <img src={project.image} alt='' className='h-60 w-80'/>
                        <h1>Link: {project.link}</h1>
                        <h1>{project.description}</h1>
                        <div className='flex justify-end gap-5 mt-5'>
                            <button className='bg-secondary text-primary px-5 py-2 rounded-md'
                                onClick={() => {
                                    onDelete(project);
                                }}
                            >Delete</button>
                            <button className='bg-primary text-white px-5 py-2 rounded-md'
                                onClick={() => {
                                    setSelectedItemForEdit(project);
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
                 <Form layout='vertical' onFinish={onFinish} initialValues={
                    {...selectedItemForEdit,
                    technologies: selectedItemForEdit?.technologies?.join(" , "),}
                 }>
                     <Form.Item name="title" label="Title">
                         <input placeholder='Enter Title Here..' />
                     </Form.Item>
                     <Form.Item name="image" label="Image URL">
                         <input placeholder='Enter Image URL Here..' />
                     </Form.Item>
                     <Form.Item name="link" label="Link">
                         <input placeholder='Enter Link Here..' />
                     </Form.Item>
                     <Form.Item name="description" label="Job Description">
                         <textarea placeholder='Enter Description Here..' />
                     </Form.Item>
                     <Form.Item name="technologies" label="Technologies Used">
                         <input placeholder='Enter Technologies Used Here..' />
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

export default AdminProjects