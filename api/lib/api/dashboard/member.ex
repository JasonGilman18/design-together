defmodule Api.Dashboard.Member do
  use Ecto.Schema
  import Ecto.Changeset
  alias Api.Accounts.User
  alias Api.Dashboard.Document

  schema "members" do
    field :owner, :boolean, default: false
    field :read_only, :boolean, default: false
    belongs_to :user, User
    belongs_to :document, Document

    timestamps()
  end

  @doc false
  def changeset(member, attrs) do
    member
    |> cast(attrs, [:owner, :read_only, :user_id, :document_id])
    |> validate_required([:owner, :read_only, :user_id, :document_id])
  end
end
