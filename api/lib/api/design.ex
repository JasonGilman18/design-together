defmodule Api.Design do
  @moduledoc """
  The Design context.
  """

  import Ecto.Query, warn: false
  alias Api.Repo

  alias Api.Design.Component



  def compare_components(recorded, incomingData) do
    if recorded.height != incomingData.height ||
      recorded.width != incomingData.width||
      recorded.position_x != incomingData.position_x ||
      recorded.position_y != incomingData.position_y ||
      recorded.rounded != incomingData.rounded ||
      recorded.align_horizontal != incomingData.align_horizontal ||
      recorded.align_vertical != incomingData.align_vertical ||
      recorded.margin_top != incomingData.margin_top ||
      recorded.margin_right != incomingData.margin_right ||
      recorded.margin_bottom != incomingData.margin_bottom ||
      recorded.margin_left != incomingData.margin_left ||
      recorded.padding_top != incomingData.padding_top ||
      recorded.padding_right != incomingData.padding_right ||
      recorded.padding_bottom != incomingData.padding_bottom ||
      recorded.padding_left != incomingData.padding_left ||
      recorded.background != incomingData.background ||
      recorded.border != incomingData.border ||
      recorded.type != incomingData.type ||
      recorded.text != incomingData.text ||
      recorded.text_size != incomingData.text_size ||
      recorded.text_bold != incomingData.text_bold
    do
      :different
    else
      :same
    end
  end

  @doc """
  Returns the list of components.

  ## Examples

      iex> list_components()
      [%Component{}, ...]

  """
  def list_components do
    Repo.all(Component)
  end

  @doc """
  Gets a single component.

  Raises `Ecto.NoResultsError` if the Component does not exist.

  ## Examples

      iex> get_component!(123)
      %Shape{}

      iex> get_component!(456)
      ** (Ecto.NoResultsError)

  """
  def get_component!(id), do: Repo.get!(Component, id)

  @doc """
  Creates a component.

  ## Examples

      iex> create_component(%{field: value})
      {:ok, %Component{}}

      iex> create_component(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_component(attrs \\ %{}) do
    %Component{}
    |> Component.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a component.

  ## Examples

      iex> update_component(component, %{field: new_value})
      {:ok, %Component{}}

      iex> update_component(component, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_component(%Component{} = component, attrs) do
    component
    |> Component.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a component.

  ## Examples

      iex> delete_shape(component)
      {:ok, %Component{}}

      iex> delete_component(component)
      {:error, %Ecto.Changeset{}}

  """
  def delete_component(%Component{} = component) do
    Repo.delete(component)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking component changes.

  ## Examples

      iex> change_component(component)
      %Ecto.Changeset{data: %Component{}}

  """
  def change_component(%Component{} = component, attrs \\ %{}) do
    Component.changeset(component, attrs)
  end
end
