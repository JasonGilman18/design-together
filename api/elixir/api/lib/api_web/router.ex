defmodule ApiWeb.Router do
  use ApiWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
  end

  scope "/api", ApiWeb do
    pipe_through :api

    post "/login", AuthController, :login
    get "/logout", AuthController, :logout
    get "/authenticated", AuthController, :check_authenticated
  end
end
