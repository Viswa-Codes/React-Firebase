import Signup from "./pages/Signup";
import Signin from "./pages/Signin";  
import { useFirebase } from "./context/Firebase"; 
import { getFirestore,collection,addDoc,doc,getDoc,query,where,getDocs,updateDoc,deleteDoc } from "firebase/firestore";
import { getDatabase,set,ref,get } from "firebase/database";
import { app } from "./firebase";


const firestore = getFirestore(app);
const database = getDatabase(app);

function App() {
   const { authLoading, user,logout } = useFirebase();

    //Create/Add data to firestore
    const addData = async () => {
      try {
        const result = await addDoc(collection(firestore, "cities"), {
          name: "Delhi",
          pincode: 110001,
          lat: 28.6139,
          lng: 77.209
        });
        console.log("Document written with ID: ", result.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    const subCollection = async () => {
      try {
        const result=await addDoc(collection(firestore, "cities/G1cWbZYWfv4RCfpsa4oY/landmarks"), {
          name: "Red Fort 1",
          established: 1648
        });
        console.log("Document written with ID: ", result.id);
      }
      catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    //Read data from firestore
    const readData = async () => {
      try {
        const docRef = doc(firestore, "cities/G1cWbZYWfv4RCfpsa4oY");
        const docSnap = await getDoc(docRef);
        console.log("Document data:", docSnap.data());
      } catch (e) {
        console.error("Error reading document: ", e);
      }
    }

    //query data from firestore
    const queryData = async () => {
      try {
        const q = query(collection(firestore, "users"), where("IsMale", "==", true));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      } catch (e) {
        console.error("Error querying documents: ", e);
      }
    }

    //update data in firestore
    const updateData = async () => {
      try {
        const docRef = doc(firestore, "cities/G1cWbZYWfv4RCfpsa4oY");
        await updateDoc(docRef, {
          name: "New Delhi",
        });
        console.log("Document updated successfully");
      }
      catch (e) {
        console.error("Error updating document: ", e);
      }
    }

    //Delete data from firestore
    const deleteData = async () => {
      try {
        await deleteDoc(doc(firestore, "cities/G1cWbZYWfv4RCfpsa4oY/landmarks/yDyozlKfMD5cEpKSSwZ8"));
        console.log("Document deleted successfully");
      }
      catch (e) {
        console.error("Error deleting document: ", e);
      }
    }


    //Add data into Realtime database in firebase
    const addDataToRealtimeDB = async () => {
      try {
        //await set(ref(database, key), value);
        await set(ref(database, 'users/a/d'), {
          username: user.email,
          email: user.email,
        });
        console.log("Data added to Realtime Database successfully");
      }
      catch (e) {
        console.error("Error adding data to Realtime Database: ", e);
      }
    }

    //Get data from Realtime database in firebase
    const getDataFromRealtimeDB = async () => {
      try {
        const dataRef = ref(database, 'users/a/d');
        const snapshot = await get(dataRef);
        console.log("Data from Realtime Database: ", snapshot.val());
      }
      catch (e) {
        console.error("Error getting data from Realtime Database: ", e);
      }
    }

  return (
    <>
     {authLoading ? (
       <p>Loading...</p>
     ) : user ? (
      <>
       <p>Welcome, {user.email}</p>
       <button onClick={addData}>Add Data</button>
       <button onClick={subCollection}>Add Sub Collection</button>
        <button onClick={readData}>Read Data</button>
        <button onClick={queryData}>Query Data</button>
        <button onClick={updateData}>Update Data</button>
        <button onClick={deleteData}>Delete Data</button>
        <button onClick={addDataToRealtimeDB}>Add Data to Realtime DB</button>
        <button onClick={getDataFromRealtimeDB}>Get Data from Realtime DB</button>
        <button onClick={() => logout()}>Logout</button>
      </>
     ) : (
       <>
         <h1>React FireBase app</h1>
         <Signup />
         <Signin />
       </>
     )}
    </>
  )
}

export default App
