import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Category, PageContent } from "../../types";
import Spinner from "../../components/Spinner/Spinner";

const StaticPages = () => {
  const categories: Category[] = [
    { title: 'Home', id: 'home' },
    { title: 'About', id: 'about' },
    { title: 'Contacts', id: 'contacts' },
    { title: 'Divisions', id: 'divisions' },
  ];
  const { category } = useParams<{ category: string }>();
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        setLoading(true);
        const responseData = await axios.get(`/pages/${category}.json`);
        if (responseData.status === 200) {
          setPageContent(responseData.data);
          console.log(responseData.data);
        } else {
          throw new Error('ERROR ' + responseData.status);
        }
      } catch (error) {
        console.error('Error fetching page content:', error);
      } finally {
        setLoading(false);
      }
    };
    void fetchPageContent();
  }, [category]);

  return (
    <div>
      <ul className="category-list">
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link to={`/pages/${cat.id}`} className="category-link">{cat.title}</Link>
          </li>
        ))}
      </ul>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {pageContent && (
            <>
              <h1>{pageContent.title}</h1>
              <p>{pageContent.content}</p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default StaticPages;
