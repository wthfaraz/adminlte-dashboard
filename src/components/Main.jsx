import React, { useState, useEffect } from 'react'
import { AsyncStorage } from 'AsyncStorage'
import axios from 'axios'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col } from 'react-grid-system';

toast.configure()
const Main = () => {

  const [link, setLink] = useState('')
  const [userID, setoleID] = useState()

  const SetLocalLogin = async () => {
    try {
      let ID = await AsyncStorage.getItem('ID');
      if (userID !== null) {
        setoleID(ID)
      }
    } catch {
      return null;
    }
  }

  const postLink = () => {

    const userObj = {
      user_id: userID,
      url: link
    }

    axios.post('https://digicardapi.alphanitesofts.com/api/url', userObj)
      .then((res) => {
        toast.info('Link Posted Successfully', { theme: "dark" })
      })
      .catch((err) => {
        toast.warn('error while uploading link')
      })
  }

  const delLink = () => {
    axios.post(`https://digicardapi.alphanitesofts.com/api/delete_url/${userID}`)
      .then((res) => {
        toast.error('Link Deleted Successfully')
      })
      .catch((err) => {
        toast.warn('error while deleting link')
      })
  }

  // sending Link to the progress side 

  // you've to add autoplay=1&mute=1

  useEffect(() => { SetLocalLogin() }, [])


  return (
    <div>
      <div className="">
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Add Video</h1>
                </div>

              </div>
            </div>
          </div>
          <div className="content">
            <div className="container-fluid">
              <div className="row">

                {/* /.col-md-6 */}
                <div className="col-lg-12">
                  <div className="card card-primary card-outline">

                    <div className="card-body">
                      <div className="input-group input-group-lg mt-4 mb-2">
                        <span className="input-group-text" id="inputGroup-sizing-lg"> <i className="fa-solid fa-link" />  </span>
                        <input type="text" className="form-control " onChange={(e) => setLink(e.target.value)} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                      </div>
                      <h4 className='mt-2 mb-2'>Paste the embedded Youtube  <i className="fa-brands fa-youtube" />	 link here!</h4>
                      <button onClick={postLink} className='btn btn-outline-primary btn-lg'>Submit</button>&nbsp;
                      <button onClick={delLink} className='btn btn-outline-danger btn-lg'>Delete</button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Main