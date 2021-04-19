defmodule Api.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Api.Dashboard.{Member, Document}

  schema "users" do
    field :email, :string
    field :first_name, :string
    field :last_name, :string
    field :session_expire, :utc_datetime
    field :session_token, Ecto.UUID
    many_to_many :documents, Document, join_through: "members"
    has_many :members, Member

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:first_name, :last_name, :email, :session_token, :session_expire])
    |> validate_required([:first_name, :last_name, :email])
  end
end
