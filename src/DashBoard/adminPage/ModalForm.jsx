import React, {  useRef, useEffect } from "react"
import ReactDOM from "react-dom"

export default function ModalForm({isShowing,setIsShowing,singleData,setFeedback,handleSubmi,feedback}) {
 
  const {fullName,email, experience,age} = singleData 

  const wrapperRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShowing(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [wrapperRef,setIsShowing])

  useEffect(() => {
    let html = document.querySelector("html")

    if (html) {
      if (isShowing && html) {
        html.style.overflowY = "hidden"

        const focusableElements =
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

        const modal = document.querySelector("#modal") // select the modal by it's id

        const firstFocusableElement =
          modal.querySelectorAll(focusableElements)[0] // get first element to be focused inside modal

        const focusableContent = modal.querySelectorAll(focusableElements)

        const lastFocusableElement =
          focusableContent[focusableContent.length - 1] // get last element to be focused inside modal

        document.addEventListener("keydown", function (e) {
          if (e.keyCode === 27) {
            setIsShowing(false)
          }

          let isTabPressed = e.key === "Tab" || e.keyCode === 9

          if (!isTabPressed) {
            return
          }

          if (e.shiftKey) {
            // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus() // add focus for the last focusable element
              e.preventDefault()
            }
          } else {
            // if tab key is pressed
            if (document.activeElement === lastFocusableElement) {
              // if focused has reached to last focusable element then focus first focusable element after pressing tab
              firstFocusableElement.focus() // add focus for the first focusable element
              e.preventDefault()
            }
          }
        })

        firstFocusableElement.focus()
      } else {
        html.style.overflowY = "visible"
      }
    }
  }, [isShowing,setIsShowing])

  return (
    <>
     

      {isShowing && typeof document !== "undefined"
        ? ReactDOM.createPortal(
            <div
              className="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-slate-300/20 backdrop-blur-sm"
              aria-labelledby="header-4a content-4a"
              aria-modal="true"
              tabindex="-1"
              role="dialog"
            >
              {/*    <!-- Modal --> */}
          <div
      className="flex max-h-[90vh] max-w-sm flex-col gap-4 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
      id="modal"
      role="document"
    >
      {/* Modal header */}
      <header id="header-4a" className="flex items-center">
        <h3 className="flex-1 text-lg font-medium text-slate-700">
          User Details & Feedback
        </h3>
        <button
          onClick={() => setIsShowing(false)}
          className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide transition duration-300 rounded-full justify-self-center whitespace-nowrap text-blue-500 hover:bg-blue-100 hover:text-blue-600 focus:bg-blue-200 focus:text-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-blue-300 disabled:shadow-none disabled:hover:bg-transparent"
          aria-label="close dialog"
        >
          <span className="relative only:-mx-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              role="graphics-symbol"
              aria-labelledby="title-79 desc-79"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </button>
      </header>

      {/* Modal body */}
      <div id="content-4a" className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-6">
          {/* Display user information */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-slate-700">Full Name:</span>
              <span>{fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-slate-700">Email:</span>
              <span>{email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-slate-700">Experience:</span>
              <span>{experience} years</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-slate-700">Age:</span>
              <span>{age}</span>
            </div>
          </div>

          {/* Feedback form */}
          <form onSubmit={handleSubmi}>
            <div className="relative mb-6">
              <textarea
                id="feedback"
                name="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder=" "
                rows="4"
                className="relative w-full p-4 text-sm transition-all border rounded outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                required
              />
              <label
                htmlFor="feedback"
                className="absolute -top-2 left-2 z-[1] px-2 text-xs text-blue-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500"
              >
                Your Feedback
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-emerald-300 disabled:shadow-none"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
            </div>,
            document.body
          )
        : null}
    </>
  )
}