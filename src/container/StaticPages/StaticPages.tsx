import {useLocation} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {PageContent} from "../../types";
import Spinner from "../../components/Spinner/Spinner";
import axiosApi from "../../axiosApi";

const StaticPages = () => {

  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(false);
  const url = useLocation().pathname;

  const fetchPageContent = useCallback(async () => {
    try {
      setLoading(true);
      const responseData = await axiosApi.get(`${url}.json`);

      setPageContent(responseData.data);
    } catch (error) {
      console.error('Error fetching page content:', error);
    }finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    void fetchPageContent();
  }, [fetchPageContent, url]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {pageContent && (
            <>
              {Object.keys(pageContent).map((key) => (
                <div className="card m-3 p-2" key={key}>
                  <h3>{pageContent[key]?.title}</h3>
                  <p><strong>Content: </strong>{pageContent[key]?.content}</p>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default StaticPages;

