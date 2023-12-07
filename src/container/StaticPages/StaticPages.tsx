import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {PageContent} from "../../types";
import Spinner from "../../components/Spinner/Spinner";

const StaticPages = () => {
  const { pageName } = useParams();
  const [pageContent, setPageContent] = useState<PageContent | null>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        setLoading(true);
        const responseData = await axios.get(`pages/${pageName}.json`);
        if (responseData.status !== 200) {
          throw new Error('ERROR ' + responseData.status);
        }
        setPageContent(responseData.data);
        console.log('2', responseData.data)
      } catch (error) {
        console.error('Error fetching page content:', error);
      }finally {
        setLoading(false);
      }
    };
    void fetchPageContent();
  }, [pageName]);
  console.log('pageContent:', pageContent);
  console.log('pageName:', pageName);

  return (
    <div>
      {loading ? (
          <Spinner />
        ) : (
        <>
          <h1>{pageContent?.title}</h1>
          <p>{pageContent?.content}</p>
        </>
      )}
    </div>
  );
};

export default StaticPages;