import React from 'react'
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminAbout() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      const tempSkills = values.skills.split(",");
      values.skills =tempSkills;
      dispatch(ShowLoading());
      const response = await axios.post("api/portfolio/update-about",
        {
          ...values,
          _id: portfolioData.abouts._id,
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
      <Form onFinish={onFinish} layout='vertical' initialValues={{
        ...portfolioData.abouts,
        skills:portfolioData.abouts.skills.join(" , "),
        }}>
        <Form.Item name='lottieURL' label="Image URL">
          <input placeholder='Enter Image URL here..' />
        </Form.Item>
        <Form.Item name='description1' label="Description">
          <textarea placeholder='Enter Description One here..' />
        </Form.Item>
        <Form.Item name='description2' label="Description">
          <textarea placeholder='Enter Description Two here..' />
        </Form.Item>
        <Form.Item name='skills' label="Skills">
          <textarea placeholder='Add Skills here..' />
        </Form.Item>
        <div className='flex justify-end '>
          <button className='px-10 py-2 bg-primary text-white' type='submit'>SAVE</button>
        </div>
      </Form>
    </div>
  )
}

export default AdminAbout