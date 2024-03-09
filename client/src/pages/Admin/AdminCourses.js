import { Form, Modal, message } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';

function AdminCourses() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { courses } = portfolioData;
    const [showAddEditModel, setShowAddEditModel] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
    const [type, setType]=React.useState("add");
    const [form] =Form.useForm();


    const onFinish = async (values) => {

        try {
            dispatch(ShowLoading());
            let response;

            if (selectedItemForEdit) {
                response = await axios.post("api/portfolio/update-course", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            } else {
                response = await axios.post("api/portfolio/add-course", values);
            }

            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                setShowAddEditModel(false);
                setSelectedItemForEdit(null);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
                form.resetFields();

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
            const response = await axios.post("api/portfolio/delete-course", { _id: item._id });
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
                >Add Course</button>
            </div>
            <div className='grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1'>
                {courses.map((course) => (
                    <div className='shadow boder p-5 border-gray-400 flex flex-col'>
                        <h1 className='text-primary text-xl font-bold'>{course.title}</h1>
                        <hr />
                        <img src={course.image} alt='' className='h-60 w-80 rounded mt-3 '/>
                        <h1>Link: {course.link}</h1>
                        <h1>{course.description}</h1>
                        <div className='flex justify-end gap-5 mt-5'>
                            <button className='bg-secondary text-primary px-5 py-2 rounded-md'
                                onClick={() => {
                                    onDelete(course);
                                }}
                            >Delete</button>
                            <button className='bg-primary text-white px-5 py-2 rounded-md'
                                onClick={() => {
                                    setSelectedItemForEdit(course);
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
                 title={selectedItemForEdit ? "Edit Course" : "Add Course"}
                 footer={null}
                 onCancel={() => {
                     setShowAddEditModel(false);
                 setSelectedItemForEdit(null);
                 }}>
                 <Form layout='vertical' onFinish={onFinish} initialValues={ selectedItemForEdit} form={form}>
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

export default AdminCourses