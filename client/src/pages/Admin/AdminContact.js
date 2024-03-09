import React from 'react'
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminContact() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("api/portfolio/update-contact",
        {
          ...values,
          _id: portfolioData.contacts._id,
        });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
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
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.contacts}>

        <Form.Item name='name' label="Name">
          <input placeholder='Enter Name here..' />
        </Form.Item>
        <Form.Item name='email' label="Email">
          <input placeholder='Enter Email here..' />
        </Form.Item>
        <Form.Item name='mobile' label="Mobile">
          <input placeholder='Enter Mobile here..' />
        </Form.Item>
        <Form.Item name='address' label="Address">
          <input placeholder='Enter Address here..' />
        </Form.Item>
        <div className='flex justify-end '>
          <button className='px-10 py-2 bg-primary text-white' type='submit'>SAVE</button>
        </div>
      </Form>
    </div>
  )
}

export default AdminContact