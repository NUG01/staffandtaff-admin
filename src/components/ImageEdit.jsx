import { useRef } from "react";

export default function ImageEdit({ modal, src, imageToReplace }) {
  const imageReference = useRef();
  function editModal(data) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    modal.querySelector("img").src = imageReference.current.src;
    imageToReplace.current = imageReference.current;
    // console.log(image != undefined ? image : "ok");
    // imageToReplace.current.src = URL.createObjectURL(src);
    // console.log(imageReference.current.src);
    //     const form = new FormData();
    // form.append('my_field', 'my value');
    // form.append('my_buffer', new Blob([1,2,3]));
    // form.append('my_file', fileInput.files[0]);

    // axios.post('https://example.com', form)
  }

  return (
    <div className="p-[10px] sm:w-[calc(20%)] w-full relative flex items-center justify-center">
      <i
        className="fa-solid fa-pen text-white absolute right-[20px] top-[20px] bg-black w-[30px] h-[30px] flex justify-center items-center rounded-full text-[13px] cursor-pointer"
        onClick={() => editModal()}
      ></i>
      <img
        src={src}
        alt=""
        className="w-full object-contain"
        ref={imageReference}
      />
    </div>
  );
}
