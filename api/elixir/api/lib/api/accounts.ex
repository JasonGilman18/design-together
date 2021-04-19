defmodule Api.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias Api.Repo
  alias Api.Accounts.User


  def login_user(token_id) do
    google_res = authenticate_user_with_google(token_id)
    case Map.fetch(google_res, "email_verified") do
      {:ok, verified} ->
        if verified == "true" do
          user_email = Map.get(google_res, "email")
          query = from u in User, where: u.email == ^user_email
          case Repo.exists?(query) do
            true ->
              user = Repo.get_by(User, email: user_email)
              session_token = Ecto.UUID.generate()
              session_expire = DateTime.utc_now()
              case update_user(user, %{session_token: session_token, session_expire: session_expire}) do

                {:ok, updated_user} -> {:ok, user.id, updated_user.session_token}
                {:error, _changeset} -> :error
              end
            false ->
              user = %{
                email: user_email,
                first_name: Map.get(google_res, "given_name"),
                last_name: Map.get(google_res, "family_name")
              }
              case create_user(user) do
                {:ok, new_user} ->
                  session_token = Ecto.UUID.generate()
                  session_expire = DateTime.utc_now()
                  case update_user(new_user, %{session_token: session_token, session_expire: session_expire}) do

                    {:ok, updated_user} -> {:ok, updated_user.id, updated_user.session_token}
                    {:error, _changeset} -> :error
                  end
                {:error, _errors} ->
                  :error
              end
          end
        else
          :error
        end
      :error -> :error
    end
  end

  defp authenticate_user_with_google(token_id) do
    authenticate_url = "https://oauth2.googleapis.com/tokeninfo?id_token=#{token_id}"
    task1 = Task.async(fn ->
      case HTTPoison.get(authenticate_url) do
        {:ok, %HTTPoison.Response{body: body}} ->
          Poison.decode!(body)

        {:error, %HTTPoison.Error{reason: reason}} ->
          Poison.decode!(reason)
      end
    end)
    Task.await(task1)
  end

  def logout_user(current_user) do
    case update_user(current_user, %{session_token: nil, session_expire: nil}) do
      {:ok, _updated_user} -> :ok
      {:error, _changeset} -> :error
    end
  end

  def get_error_resp(status_code, message, data) do
    %{
      status: "error",
      status_code: status_code,
      message: message,
      data: data
    }
  end

  def get_ok_resp(message, data) do
    %{
      status: "ok",
      status_code: 200,
      message: message,
      data: data
    }
  end


  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{data: %User{}}

  """
  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end
end
