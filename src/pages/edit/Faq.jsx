import { React, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FaqInput from '../../components/Forms/inputs/FaqInput';

function FaqEdit(props) {
  const params = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    BasicAxios.get("admin/establishment/" + params.id).then((res) => {
      setData(res?.data);
    });
  }, []);
  
  const category = useRef()
  const heading = useRef()
  const [content, setContent] = useState('');

  const options = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'color': [] },],
    [{ 'align': [] }],
    ['clean']
  ];

  const modules = {
    toolbar: options
  }

  function addFAQ(){
    console.log(category.current.value);
    console.log(heading.current.value);
    console.log(content);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 flex flex-col gap-[30px]">

      <FaqInput
          name="category"
          label="Category"
          inpRef={category}
      />

      <FaqInput
          name="heading"
          label="Heading"
          inpRef={heading}
      />

      <ReactQuill modules={modules} theme="snow" value={content} onChange={setContent} className='text-black'/>

      <button
          onClick={()=> addFAQ()}
          className="max-w-fit inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
      </button>
    </div>
  )
}

export default FaqEdit
