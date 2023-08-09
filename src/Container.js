import update from 'immutability-helper'
import { useCallback, useState, useEffect, useRef } from 'react'
import { useDrop } from 'react-dnd'
import { Box } from './Box.js'

const styles = {

  width:612, 
  height:792,
  border: '1px solid black',
  position: 'relative',
}

const template = 'template/t1.png'

export const Container = ({ hideSourceOnDrag }) => {


const [showCanvas, setCanvas] = useState(false)

const [landscape, setLandscape] = useState(false)

const [imageDimension, setImageDimension] = useState({
  width:1096,height:750
})


  const canvas = useRef()

  const [boxes, setBoxes] = useState({
    b: { top: 180, left: 20, title: 'Sai Raghavendra sharma', },
    a: { top: 180, left: 20, title: 'Text 2' },

    c: { top: 180, left: 20, title: 'Text 3' },

  })

  useEffect(() => {
    // dynamically assign the width and height to canvas

    let ctx = null

    const canvasEle = canvas.current
    var imageObj1 = new Image()
    imageObj1.src = template



    const aspectRatio = imageObj1.naturalWidth / imageObj1.naturalHeight;


    if (aspectRatio > 1) {

      // alert('landscape')
      //landscape
      setImageDimension({...imageDimension, width: 1097, height: 750})

      setLandscape(true)
    } else {
      //portrait

      // alert('portrait')
      setLandscape(false)

      setImageDimension({...imageDimension, width: imageObj1.width, height: imageObj1.height})
    }

    imageObj1.onload = function () {
      canvasEle.width = imageObj1.width
      canvasEle.height = imageObj1.height
    }
    // get context of the canvas
    ctx = canvasEle.getContext('2d')
  }, [])

  const moveBox = useCallback(
    (id, left, top) => {

      // Ensure the new position is within container boundaries
      left = Math.min(Math.max(left, 0), imageDimension.width) // 50 is the box width
      top = Math.min(Math.max(top, 0), imageDimension.height) // 50 is the box height

      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
    },
    [boxes, setBoxes],
  )

  const [, drop] = useDrop(
    () => ({
      accept: 'box',
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset()
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)
        moveBox(item.id, left, top)
        return undefined
      },
    }),
    [moveBox],
  )

  const updateCanvas =()=> {
    // var {x, y} = cordinates

  let ctx  = null

    const canvasEle = canvas.current
    ctx = canvasEle.getContext('2d')
    var imageObj1 = new Image()
    imageObj1.src = template
    imageObj1.onload = function () {


      ctx.drawImage(imageObj1, 0, 0)

      if(landscape){
        {Object.keys(boxes).map((key) => {
          const { left, top, title } = boxes[key]
          ctx.font = `20pt Montserrat`
          ctx.fillStyle = 'green'
          ctx.fillText(title, left, top+30)
        })}
      }else{
        {Object.keys(boxes).map((key) => {
          const { left, top, title } = boxes[key]
          ctx.font = `20pt Montserrat`
          ctx.fillStyle = 'green'
          ctx.fillText(title, left, top+30)
        })}
      }



      // boxes.map((text, index) => {

      //   console.log('image on load',)

      //   ctx.font = `${text.size}pt Montserrat`
      //   ctx.fillStyle = 'green'


      //   ctx.fillText(data[1][index]?.title, text.x, text.y)
      // })
    }

    setCanvas(true)
  }



  return (

    <div style={{}}>


<div>
<div ref={drop} style={{
    width: imageDimension.width, 
    height:imageDimension.height,
    border: '1px solid black',
    position: 'relative',
}}>
      <img src={template} style={{width:'100%', height:'100%', objectFit:'cover'}} />
      {Object.keys(boxes).map((key) => {
        const { left, top, title } = boxes[key]
        return (
          <Box
            key={key}
            id={key}
            left={left}
            top={top}
            hideSourceOnDrag={hideSourceOnDrag}
          >
            {title}
          </Box>
        )
      })}
    </div>
    <button onClick={updateCanvas} >preview</button>

</div>


  <canvas ref={canvas}></canvas>



    </div>

  )
}
