import React from 'react'
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminIntro() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("api/portfolio/update-intro",
        {
          ...values,
          _id: portfolioData.intros._id,
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
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.intros}>
        <Form.Item name='welcomeText' label="Welcome Text">
          <input placeholder='Enter Welcometext here..' />
        </Form.Item>
        <Form.Item name='firstName' label="First Name">
          <input placeholder='Enter First Name here..' />
        </Form.Item>
        <Form.Item name='lastName' label="Last Name">
          <input placeholder='Enter Last Name here..' />
        </Form.Item>
        <Form.Item name='caption' label="Caption">
          <input placeholder='Enter Caption here..' />
        </Form.Item>
        <Form.Item name='description' label="Description">
          <textarea placeholder='Enter Description here..' />
        </Form.Item>
        <div className='flex justify-end '>
          <button className='px-10 py-2 bg-primary text-white' type='submit'>SAVE</button>
        </div>
      </Form>
    </div>
  )
}

export default AdminIntro