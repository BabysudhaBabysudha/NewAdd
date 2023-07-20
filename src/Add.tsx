import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { IonContent, IonInput, IonButton, IonIcon, IonCheckbox, IonModal,IonItem,IonLabel,IonRow,IonCol } from '@ionic/react';
interface users {
    id: number;
    name: string;
    price: number;
    oldPrice:number;
    category:string;
    isActive:string;
    description:string;
   }
   interface UserData {
    id: number;
    name: string;
    price: string;
  }
const Add= () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [category, setCategory] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [description, setDescription] = useState('');
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState<users[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [popupData, setPopupData] = useState<UserData>({
    id: 0,
    name: '',
    price: '',
    });
    
  const fetchData=()=>{
    axios.get("http://localhost:3000/users")
    .then((res)=>{
     console.log(res.data);
     setData(res.data);
    })
    .catch((err)=>{
     console.log(err);
  })
}
useEffect(()=>{
 fetchData()
},[])
  const handleClick = (e:any) => {
    e.preventDefault();
    const userData = {
      id,
      name,
      price,
      oldPrice, 
      category,
      isActive,
      description,
    };

    axios.post('http://localhost:3000/users', userData)
      .then((res) => {
        console.log(res.data);
        setId('');
        setName('');
        setPrice('');
        setOldPrice('');
        setCategory('');
        setIsActive(false);
        setDescription('');
      })
      .catch((err) => {
        console.log('Error:', err);
      })
      .finally(() => {
        fetchData(); 
      });
  }; 
  const handleDelete=((id:number)=>{
    axios.delete(`http://localhost:3000/users/${id}`)
    setData(data.filter((item)=>{
     return item.id !==id
    }))
  }) 
  const handleUpdate = (id:string,name:string, price:string,oldPrice:string,category:string,isActive:string,description:string) => {
    setId(id);
    setName(name);
    setPrice(price);
    setOldPrice(oldPrice);
    setCategory(category);
    setIsActive(false);
    setDescription(description);
    setEdit(true);
   
  };
  const handleEdit = () => {
    axios
      .put(`http://localhost:3000/users/${id}`, { id, name, price,oldPrice,category,isActive,description })
      .then(() => {
        setId("");
        setName("");
        setPrice("");
        setOldPrice("");
        setCategory("");
        setIsActive(false);
        setDescription("");
       
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        fetchData();
        setEdit(false);
      });
  };
  const handlePopupUpdate = () => {
    axios
      .put(`http://localhost:3000/users/${popupData.id}`, popupData)
      .then(() => {
        setShowPopup(false);
        setEditMode(false);
        fetchData();
      })
      .catch((err) => console.log(err));
  };
  const handleEdits = (userData: UserData) => {
    setShowPopup(true);
    setEditMode(true);
    setPopupData(userData);
  };
  return (
       <IonContent>
        <IonRow style={{border:"1px solid"}}>
          <IonCol style={{border:"1px solid"}}>Id</IonCol>
          <IonCol style={{border:"1px solid"}}>name</IonCol>
          <IonCol style={{border:"1px solid"}}>Price</IonCol>
          <IonCol style={{border:"1px solid"}}>OldPrice</IonCol>
          <IonCol style={{border:"1px solid"}}>category</IonCol>
          <IonCol style={{border:"1px solid"}}>isActive</IonCol>
          <IonCol style={{border:"1px solid"}}>description</IonCol>
          <IonCol style={{border:"1px solid"}}>Delete</IonCol>
          <IonCol style={{border:"1px solid"}}>Update</IonCol>
          <IonCol style={{border:"1px solid"}}>Edit</IonCol>
         </IonRow>
         {data.map((item: any) => (
          <IonRow key={item.id} className='table'>
            <IonCol style={{border:"1px solid"}}>{item.id}</IonCol>
            <IonCol style={{border:"1px solid"}}>{item.name}</IonCol>
            <IonCol style={{border:"1px solid"}}>{item.price}</IonCol>
            <IonCol style={{border:"1px solid"}}>{item.oldPrice}</IonCol>
            <IonCol style={{border:"1px solid"}}>{item.category}</IonCol>
            <IonCol style={{border:"1px solid"}}>
             {item.isActive === 'true' ? <p>true</p> : <p>False</p>}
            </IonCol>
            <IonCol style={{border:"1px solid"}}>{item.description}</IonCol>
            <IonCol style={{border:"1px solid"}}>
             <IonButton  onClick={() => {
                    handleDelete(item.id);
                  }}>Delete</IonButton></IonCol>
              <IonCol style={{border:"1px solid"}}>
                  <IonButton  style={{color:"red"}} 
                  onClick={() =>
                    handleUpdate(item.id, item.name, item.price,item.oldPrice,item.category,item.isActive,item.description)
                  }
                >
                  Update
                </IonButton> </IonCol>
                <IonCol style={{border:"1px solid"}}>
                <IonButton onClick={() => handleEdits(item)}>Edit</IonButton>
              </IonCol>  
               
          </IonRow>
        ))}
        <IonModal isOpen={showPopup} onDidDismiss={() => setShowPopup(false)}>
          <IonContent className="ion-padding">
            <h2>{editMode ? 'Edit User Data' : 'Add User Data'}</h2>
            <IonItem>
              <IonLabel position="stacked">ID</IonLabel>
              <IonInput
                type="number"
                value={popupData.id}
                onIonChange={(e) => setPopupData({ ...popupData, id: +e.detail.value! })}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">name</IonLabel>
              <IonInput
                value={popupData.name}
                onIonChange={(e) => setPopupData({ ...popupData, name: e.detail.value! })}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Price</IonLabel>
              <IonInput
                value={popupData.price}
                onIonChange={(e) => setPopupData({ ...popupData, price: e.detail.value! })}
              />
            </IonItem>
            <IonButton onClick={handlePopupUpdate}>
              {editMode ? 'Update' : 'Add'}
            </IonButton>
            <IonButton onClick={() => setShowPopup(false)}>Cancel</IonButton>
          </IonContent>
        </IonModal>
      <input style={{padding:"10px",marginLeft:"50px"}}
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="id"
          required
        />
      <input style={{padding:"10px",marginLeft:"50px"}}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <input style={{padding:"10px",marginLeft:"50px"}}
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
        />
        <input style={{padding:"10px",marginLeft:"50px"}}
          type="number"
          value={oldPrice}
          onChange={(e) => setOldPrice(e.target.value)}
          placeholder="Old Price"
        />
        <input style={{padding:"10px",marginLeft:"50px"}}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        
        <IonCheckbox style={{padding:"10px",marginLeft:"50px"}}
          checked={isActive} 
          onIonChange={(e) => setIsActive(e.detail.checked)}
        />
         <textarea style={{padding:"10px",marginLeft:"50px"}}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        /> 
         {edit ? (
        <IonButton onClick={handleEdit}>update</IonButton>
      ) : (
        <IonButton type="submit" onClick={handleClick} style={{marginLeft:"70px"}}> 
          Add
        </IonButton>
      )}
     
   </IonContent>
  );
};

export default Add;
