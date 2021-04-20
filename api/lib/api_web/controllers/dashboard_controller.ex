defmodule ApiWeb.DashboardController do
  use ApiWeb, :controller

  alias Api.Dashboard
  alias Api.Accounts

  def new_document(conn, _params) do
    doc_name = conn.body_params["name"]
    current_user = conn.assigns.current_user
    case Dashboard.new_document(doc_name, current_user.id) do
      :ok ->
        send_resp(conn, 200, Poison.encode!(Accounts.get_ok_resp(
          "Successfully created document", %{}
        )))
      :error ->
        send_resp(conn, 200, Poison.encode!(Accounts.get_error_resp(
          500, "Unsuccessfully created document", %{}
        )))
    end
  end

  def get_documents(conn, _params) do
    current_user = conn.assigns.current_user
    #docs = Dashboard.get_doc_names(current_user.id)
    docs = Dashboard.get_docs(current_user)
    send_resp(conn, 200, Poison.encode!(Accounts.get_ok_resp(
      "Successfully fetched user's documents", %{documents: docs}
    )))
  end

  def req_auth_token(conn, _params) do
    current_user = conn.assigns.current_user
    doc_id = conn.body_params["doc_id"]
    case Dashboard.generate_auth_token(current_user, doc_id) do
      {:ok, token} ->
        send_resp(conn, 200, Poison.encode!(Accounts.get_ok_resp(
          "Successfully generated auth token", %{authToken: token}
        )))
      :error ->
        send_resp(conn, 200, Poison.encode!(Accounts.get_error_resp(
          500, "Unsuccessfully generated auth token", %{authToken: ""}
        )))
    end
  end

end
