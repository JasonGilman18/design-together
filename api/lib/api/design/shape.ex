defmodule Api.Design.Shape do
  use Ecto.Schema
  import Ecto.Changeset

  schema "shapes" do
    field :height, :integer
    field :width, :integer
    field :x_position, :integer
    field :y_position, :integer
    field :document_id, :id

    timestamps()
  end

  @doc false
  def changeset(shape, attrs) do
    shape
    |> cast(attrs, [:height, :width, :x_position, :y_position])
    |> validate_required([:height, :width, :x_position, :y_position])
  end
end
