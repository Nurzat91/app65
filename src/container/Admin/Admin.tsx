import {useEffect, useState} from "react";
import Spinner from "../../components/Spinner/Spinner";
import {FormPages} from "../../types";
import {useNavigate, useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [selectCategory, setSelectCategory] = useState('');
  const[formPages, setFormPages] = useState<FormPages>({
    id: Math.random().toString(),
    category: '',
    title: '',
    content: '',
  });
  const param = useParams() as { id: string };
  useEffect(() => {
    const fetchData = async () => {
      if (param.id) {
        try {
          setLoading(true);
          const response = await axiosApi.get(`pages/${param.id}.json`);
          if (response.status === 200) {
            const postData: FormPages = response.data;
            setFormPages(postData);
            console.log(setFormPages);
          }
        } catch (error) {
          console.error('Error fetching post:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    void fetchData();
  }, [param.id]);

  const onChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormPages((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { category, title, content } = formPages;

      const dataToSend = {
        [category]: {
          title,
          content,
        },
      };

      if (param.id) {
        await axiosApi.put(`/pages/${param.id}.json`, dataToSend);
      } else {
        await axiosApi.post('pages.json', dataToSend);
      }
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row mt-2">
      <div className="col">
        {loading ? (
          <Spinner/>
        ) : (
          <form onSubmit={onFormSubmit}>
            <h3>Add new post</h3>
            <div className="form-group">
              <h6>Select page</h6>
              <select
                id={formPages.id}
                name="category"
                value={formPages.category}
                onChange={onChanged}
              >
                <option value="" disabled>
                  Выберите категорию
                </option>
                <option>home</option>
                <option>about</option>
                <option>contacts</option>
                <option>divisions</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="title" className="mb-2">
                Title
              </label>
              <input
                id={formPages.id}
                type="text"
                name="title"
                required
                className="form-control"
                value={formPages.title}
                onChange={onChanged}
              />
            </div>
            <div className="form-group d-flex flex-column my-3">
              <label htmlFor="post" className="mb-2">
                Content
              </label>
              <textarea
                className="p-2"
                id={formPages.id}
                name="content"
                required
                rows={10}
                cols={40}
                value={formPages.content}
                onChange={onChanged}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Admin;