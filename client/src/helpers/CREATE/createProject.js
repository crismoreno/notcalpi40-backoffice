import fetchProjects from '../GET/getProjects';
import { authHeader } from '../authHeader';
import axios from 'axios';
const url = '/api';
import qs from 'qs';

function createProject(body, callback) {
  return (dispatch) => {
    const {
      title,
      customer,
      collaborators,
      completion_date,
      orderby,
      link_to_prod,
      link_to_repo,
      link_to_download,
      video,
      tags,
      codingLangs,
      madeats,
      show,
      is_featured,
      description,
    } = body;
    axios({
      method: 'post',
      url: `${url}/createproject`,
      data: qs.stringify({
        name: title,
        customer,
        collaborators,
        completion_date,
        orderby,
        link_to_prod,
        link_to_repo,
        link_to_download,
        video,
        tags,
        codingLangs,
        madeats,
        show,
        is_featured,
        description,
      }),
      headers: authHeader(),
    })
      .then(function (response) {
        dispatch(fetchProjects(response.data));
        callback(null, 'Project was created successfully');
      })
      .catch(function (err) {
        callback(err, null);
      });
  };
}

export { createProject };
