import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { openNotification } from "../reducers/NotificationSlice";
import {
  useGetArticleByIdMutation,
  useGetVersionByUrlQuery,
} from "../reducers/articleApi";
import { selectArticleById, setArticle } from "../reducers/articleSlice";
import { getErrorMessage } from "../reducers/functions";
import { useAppDispatch } from "../store";

function ArticlePage() {
  const { articleUrl } = useParams();
  const dispatch = useAppDispatch();
  const {
    data: articleVersions,
    isSuccess: isVersionSuccess,
    isLoading: isVersionLoading,
    isError: isVersionError,
    error: versionError,
  } = useGetVersionByUrlQuery(articleUrl as string);
  const [
    getArticleById,
    {
      data,
      error: dataError,
      isLoading: isDataLoading,
      isSuccess: isDataSuccess,
      isError: isDataError,
    },
  ] = useGetArticleByIdMutation();
  const [articleId, setArticleId] = useState("");
  const selectedArticle = useSelector(selectArticleById(articleId));

  useEffect(() => {
    if (!isDataLoading) return;
    dispatch(
      openNotification({
        title: "Récupération de l'article",
        type: "loading",
      })
    );
  }, [isDataLoading]);

  useEffect(() => {
    if (!isVersionLoading) return;
    dispatch(
      openNotification({
        title: "Récupération de la version",
        type: "loading",
      })
    );
  }, [isVersionLoading]);

  useEffect(() => {
    if (!isDataError || !dataError) return;
    const errorMessage = getErrorMessage(dataError);
    dispatch(
      openNotification({
        title: "Erreur de récupération de l'article",
        type: "error",
        description: errorMessage,
        detailed: true,
      })
    );
  }, [isDataError]);

  useEffect(() => {
    if (!isVersionError || !versionError) return;
    const errorMessage = getErrorMessage(versionError);
    dispatch(
      openNotification({
        title: "Erreur de récupération de la version",
        type: "error",
        description: errorMessage,
        detailed: true,
      })
    );
  }, [isVersionError]);

  useEffect(() => {
    if (isDataSuccess && data) {
      console.log(data);

      dispatch(setArticle(data));
      dispatch(
        openNotification({
          title: "Article chargé",
          type: "success",
        })
      );
    }
  }, [isDataSuccess]);

  useEffect(() => {
    if (isVersionSuccess && articleVersions) {
      dispatch(
        openNotification({
          title: "Version chargée",
          type: "success",
        })
      );
      setArticleId(articleVersions._id as string);
    }
  }, [isVersionSuccess]);

  useEffect(() => {
    if (!selectedArticle) return;
    console.log("ALORS");
    console.log(selectedArticle.refreshCount);
    console.log(articleVersions?.refreshCount);
    console.log(selectedArticle.data);

    if (
      selectedArticle.refreshCount !== articleVersions?.refreshCount ||
      !selectedArticle.data
    ) {
      getArticleById(articleId as string);
    }
  }, [selectedArticle]);

  return <div>{selectedArticle?.data}</div>;
}

export default ArticlePage;
