import { useEffect, useState } from 'react';
// useDebugValue
import axios from 'axios';

//Figures
export const GetAllFigures = () => {

  let url = 'https://localhost:7281/api/Figures';
  const [figures, setFigures] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setFigures(response.data)
      })
  }, [url])

  return figures;
}
export const GetFigureById = (id) => {

  let url = 'https://localhost:7281/api/Figures/' + id;
  const [figures, setFigures] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setFigures(response.data)
      })
  }, [url])

  return figures;
}
export const GetFiguresByBrand = (BrandId) => {

  let url = 'https://localhost:7281/api/Figures/brand/' + BrandId;
  const [figures, setFigures] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setFigures(response.data)
      })
  }, [url])

  return figures;
}
export const GetFiguresByManufacturer = (ManyfacturerId) => {
  let url = 'https://localhost:7281/api/Figures/manufacturer/' + ManyfacturerId;
  const [figures, setFigures] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setFigures(response.data)
      })
  }, [url])

  return figures;
}

//Get Other Data (Connected to Figure)
export const GetAllBrands = () => {

  let url = 'https://localhost:7281/api/Brands';
  const [Brands, setFigures] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setFigures(response.data)
      })
  }, [url])

  return Brands;
}
export const GetAllManufacturers = () => {

  let url = 'https://localhost:7281/api/Manufacturers';
  const [Manufacturers, setFigures] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setFigures(response.data)
      })
  }, [url])

  return Manufacturers;
}
export const GetAllCharacters = () => {

  let url = 'https://localhost:7281/api/Characters';
  const [Characters, setFigures] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setFigures(response.data)
      })
  }, [url])

  return Characters;
}
export const GetAllLines = () => {

  let url = 'https://localhost:7281/api/Lines';
  const [Lines, setFigures] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setFigures(response.data)
      })
  }, [url])

  return Lines;
}
export const GetAllEditions = () => {

  let url = 'https://localhost:7281/api/Editions';
  const [Editions, setFigures] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setFigures(response.data)
      })
  }, [url])

  return Editions;
}

//User
export const GetAllUsers = () => {

  let url = 'https://localhost:7281/api/Users';
  const [users, setFigures] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setFigures(response.data)
      })
  }, [url])

  return users;
}
export const GetUserByGoogle = (GoogleId) => {
  let url = 'https://localhost:7281/api/Users/googleId/' + GoogleId;
  let data = axios.get(url);
  return data;
}
export const AddUser = (Uname, GooId) => {

  let url = 'https://localhost:7281/api/users';
  axios.post(url, {
    username: Uname,
    googleId: GooId
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

}

//Collection
//Nu gaat overal username mee want deze sla ik locaal op, kan dit ook veranderen naar userId maar dan zou ik de localstorage anders moeten doen/
export const AddToCollection = (username, figureId) => {

  let url = 'https://localhost:7281/api/Collection?user=' + username + '&figure=' + figureId;
  axios.post(url, {
    // user: username,
    // figure: figureId
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  window.location.reload();
}
export const DeleteCollected = (username, figureId) => {

  let url = 'https://localhost:7281/api/Collection?user=' + username + '&figure=' + figureId;
  axios.delete(url)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  window.location.reload();

}
export const CheckAlreadyCollected = (username, figureId) => {

  let url = 'https://localhost:7281/api/Collection/item?username=' + username + '&figureId=' + figureId;
  const [Lines, setFigures] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setFigures(response.data)
      })
      .catch(function (error) {
        // console.log(error);
      })
  }, [url])

  return Lines;
}
export const GetAllCollectedFromUser = (userId) => {

  let url = 'https://localhost:7281/api/Collection/user/' + userId;
  const [collected, setFigures] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setFigures(response.data)
      })
  }, [url])

  return collected;
}

//Figure Image
// figureId, imageCode
export const AddFigureImage = (id, selectedFile) => {

  let formData = new FormData();
  formData.append("fileName", selectedFile.name);
  formData.append("file", selectedFile);
  console.log(selectedFile)
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };

  axios.post(
    'https://localhost:7281/api/FigureImages/' + id,
    formData,
    config
  )
    .then(function (response) {
      console.log(response);
      window.location.reload();
    })
    .catch(function (error) {
      console.log("Eroor!" + error);
    });

  // let url = 'https://localhost:7281/api/FigureImages/'+figureId;
  // const config = { headers: {'Content-Type': 'application/json'} };
  // axios.post(url, 
  //   imageCode, 
  //   config
  // )
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });


}
export const GetAllPreviewFigureImages = () => {

  let url = 'https://localhost:7281/api/FigureImages/PreviewImages';
  const [ImagesData, setFigures] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setFigures(response.data)
      })
  }, [url])

  return ImagesData;
}
export const GetSpecificFigureImageData = (figureId) => {
  console.log(figureId)
  const [imagename, setImageName] = useState([])
  let url = 'https://localhost:7281/api/FigureImages/' + figureId;
  console.log(figureId)
  useEffect(() => {
    axios.get(url)
      .then(response => {
        setImageName(response.data);
      })

  }, [url])

  return imagename;
}
export const GetSpecificFigureImage = (ImageName, classUse) => {
  //zou een blob moeten terug sturen....
  let url = 'https://localhost:7281/api/FigureImages/imagename/' + ImageName;

  axios.get(url,
    {
      responseType: 'arraybuffer'
    })
    .then(response => {
      let blob = new Blob(
        [response.data],
        { type: response.headers['content-type'] }
      )
      let imagesrc = URL.createObjectURL(blob);

      const div = document.createElement('div');
      const image = document.createElement('img');
      const box = document.getElementById('box');
      const CardItem = document.getElementById(ImageName);
      const adminPreview = document.getElementById('adminpage');
      
      image.setAttribute(
        'src',
        imagesrc,
      );

      if (classUse === "cards") {
        image.className = "cards__item__img";
        CardItem.appendChild(image);
      }
      else if(classUse === "admin"){
        image.className = "w-25";
        adminPreview.appendChild(image);
      }
      else {
        div.className = classUse;
        image.className = "d-block w-100";

        div.appendChild(image)
        box.appendChild(div);
      }
    })
}

// select top (4) Brandid, COUNT(Brandid) AS MOST_FREQUENT
// from Figures
// GROUP BY Brandid
// ORDER BY COUNT(Brandid) DESC

// export const GetSpecificFigureImageData2 = (helpme) => {
//   // console.log("figureId: " + figureId.length)
//   // let url = 'https://localhost:7281/api/FigureImages/' + 6;
//   // const [imagename, setImageName] = useState([])
//   // const [counter, setCounter] = useState(0)
//   // const [URL, setUrl] = useState('https://localhost:7281/api/FigureImages/');

//   // useEffect(() => {
//   //     axios.get(url)
//   //     .then( response => {
//   //       if(figureId.length !== 0){
//   //         if(counter !== figureId.length){
//   //           setCounter(counter+1);
//   //           setImageName( arr => [...arr, `${response.data[0].imgData}`]);
//   //           setUrl('https://localhost:7281/api/FigureImages/' + figureId[counter]);
//   //         }
//   //       }
//   //     })
//   //     // console.log("Counter: " + counter)
//   //     // console.log("URL: "+ URL)
//   //     // console.log("Id Length: " + figureId.length)
//   //     // console.log("figureId: " + figureId)
//   //     // console.log("Changer: " + changer)


//   // }, [URL])

//   // console.log(imagename);
//   // console.log("------------------------")
//   console.log(helpme)
//   let url = 'https://localhost:7281/api/FigureImages/' + helpme;
//   let imagename = axios.get(url)
//   return imagename;
// }


