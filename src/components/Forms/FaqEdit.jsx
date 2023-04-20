import { React, useRef, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FaqInput from '../../components/Forms/inputs/FaqInput';
import BasicAxios from '../../helpers/axios';
import { Load, RemoveLoader } from '../../hooks/LoaderHandle';

function FaqEdit(props) {
  const category = useRef()
  const question = useRef()
  const [data, setData] = useState([])
  const [answer, setAnswer] = useState('');

  const [errorMessage, setErrorMessage] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [categoryValue, setCategoryValue] = useState()
  const [questionValue, setQuestionValue] = useState()

  function setCatVal(value){
    setCategoryValue(value)
  }

  function setQuestVal(value){
    setQuestionValue(value)
  }

  const params = useParams();

  useEffect(() => {
    Load()
    BasicAxios.get("admin/faq/" + params.id).then((res) => {
      setData(res?.data)
      setCatVal(res?.data.category)
      setQuestVal(res?.data.question)
      setAnswer(res?.data.answer)
      RemoveLoader()
    });
  }, []);


  const options = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'color': [] },],
    [{ 'align': [] }],
    ['clean']
  ];

  const modules = {
    toolbar: options
  }

  function editFAQ(){
    setErrorMessage("");

    const payload = {
      category: category.current.value,
      question: question.current.value,
      answer
    }
    
    Load()
    BasicAxios.post("admin/faq/edit/" + params.id, payload)
      .then((res) => {
        location.href = '/dashboard/faqs'
      })
      .catch((err) => {
        RemoveLoader()
        setErrorMessage(err.response.data.errors);
      });
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 flex flex-col gap-[30px]">

      <FaqInput
          name="category"
          label="Category"
          inpRef={category}
          value={categoryValue}
          onChange={setCatVal}
      />

      <FaqInput
          name="question"
          label="Question"
          inpRef={question}
          value={questionValue}
          onChange={setQuestVal}
      />

      <ReactQuill value={answer} modules={modules} theme="snow" onChange={setAnswer} className='text-black'/>

      {errorMessage &&
        Object.keys(errorMessage).map((key) => {
          return (
            <p
              key={key}
              className="text-[16px] font-[600] mt-[1rem] text-red-600"
            >
              {errorMessage[key]}
            </p>
          );
        })}

      <button
          onClick={()=> editFAQ()}
          className="max-w-fit inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
      </button>
    </div>
  )
}

export default FaqEdit
