import {React,useCallback,useEffect,useRef,useState} from 'react'


function App() {
     const [length,setlength] = useState( 8)
     const[numberAllowed,setnumberAllowed]=useState(false)
     const[charAllowed,setcharAllowed]=useState(false)
     const[pass,setpass]=useState("")

     const  passref=useRef(null)

     let password=useCallback(()=>{
      let pass=""
      let string="ABCDEFGHIJKLOMPQRSTUVWXYZabcdefghijklompqrstuvwxyz"

      if(charAllowed) string+="`!@#$%^&*()[]{}<>;?/|"
      if(numberAllowed) string+="0123456789"

      for(let i=1;i<length;i++){
        let index=Math.floor(Math.random() * string.length+1)
        pass+=string.charAt(index)
      }
      setpass(pass)
    } ,[length,numberAllowed,charAllowed,setpass])

    let copyPassword=useCallback(()=>{
      passref.current?.select()
      passref.current?.setSelectionRange(0,length)
       window.navigator.clipboard.writeText(pass)
    },[pass])

    
    
      useEffect(()=>{
      password()
      },[length,numberAllowed,charAllowed,setpass])
     
   
  return (
 

    <>
    <div className="w-full max-w-md mx-auto border  shadow-lg shadow-white rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
           <h3 className='text-center text-white my-3'> Password Generator</h3>
       <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input type='text' value={pass} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passref}></input>
             <button className='outline-none bg-blue-700 text-white px-3 py-0.3 shrink-0' onClick={copyPassword} >Copy</button>
        </div>
       <div className=' flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
             <input type='range'min={6} max={50} value={length} className='cursor-pointer'onChange={(e)=>{setlength(e.target.value)}}></input>
            <label >Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={numberAllowed} id="numberInput" onChange={()=>{setnumberAllowed((prev)=>!prev) }}/> 
            <label htmlfor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={charAllowed} id="numberInput" onChange={()=>{setcharAllowed((prev)=>!prev) }}/> 
            <label htmlfor="characterInput">Character</label>
          </div>
        </div>
    </div>
    


    </>
   
        
  
  );

  }

export default App;
