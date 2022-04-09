import React from 'react'
import {projectFireStore} from './../firebase/index'
import { useEffect } from 'react'
export default function OneTask() {
useEffect(() =>
  {console.log(projectFireStore)}, []
)
  return (
    <div>O</div>
  )
}


