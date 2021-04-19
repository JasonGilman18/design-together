defmodule ApiWeb.Router do
  use ApiWeb, :router
  alias ApiWeb.Plugs

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug Plugs.FetchTime
  end

  pipeline :auth do
    plug Plugs.AuthenticationRequired
    plug Plugs.RefreshSession
  end

  scope "/api", ApiWeb do
    pipe_through :api

    post "/login", AccountsController, :login
  end

  scope "/api", ApiWeb do
    pipe_through :api
    pipe_through :auth

    get "/logout", AccountsController, :logout
    get "/authenticated", AccountsController, :check_authenticated
    get "/token", AccountsController, :get_auth_token
  end

  scope "/api/dashboard", ApiWeb do
    pipe_through :api
    pipe_through :auth

    post "/new", DashboardController, :new_document
    get "/get", DashboardController, :get_documents
    get "/:name", DashboardController, :get_name
  end

end
