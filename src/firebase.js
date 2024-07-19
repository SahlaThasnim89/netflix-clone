
import { initializeApp } from "firebase/app";
// import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { signOut } from "firebase/auth/web-extension";
import { createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword,
    signOut } from "firebase/auth";
// import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBMtSaOZPdcjUALOQkUaIE4T8O-XxIqhUo",
  authDomain: "netflix-clone-de51f.firebaseapp.com",
  projectId: "netflix-clone-de51f",
  storageBucket: "netflix-clone-de51f.appspot.com",
  messagingSenderId: "2640241755",
  appId: "1:2640241755:web:0d377523c99ac97a50cb7e"
};


const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const db=getFirestore(app)

const signup=async(name,email,password)=>{
    try{
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,'user'),{
            uid: user.uid,
            name,
            authProvider:'local',
            email,
        });
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const login=async(email,password)=>{
        try {
           await signInWithEmailAndPassword(auth,email,password);
        } catch (error) {
            console.log(error);
            toast.error(error.code.split('/')[1].split('-').join(' '))
        }
}

const logout=async()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};