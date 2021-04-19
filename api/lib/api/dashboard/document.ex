defmodule Api.Dashboard.Document do
  use Ecto.Schema
  import Ecto.Changeset
  alias Api.Accounts.User
  alias Api.Dashboard.Member

  schema "documents" do

    field :name, :string
    many_to_many :users, User, join_through: "members"
    has_many :members, Member

    timestamps()
  end

  @doc false
  def changeset(document, attrs) do
    document
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
