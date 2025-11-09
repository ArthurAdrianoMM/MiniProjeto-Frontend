import React, { useState, useEffect, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import { useApi } from '../hooks/useApi';
import { FREQUENCY_OPTIONS } from '../utils/constants';
import type { Habit, HabitRequest, HabitFilters } from '../types';
import './Habits.css';

export const Habits: React.FC = () => {
  const { user, logout } = useAuth();
  const { execute, error } = useApi();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState<HabitFilters>({});
  const [nameFilter, setNameFilter] = useState('');
  
  // Form state
  const [formData, setFormData] = useState<HabitRequest>({
    name: '',
    description: '',
    frequency: 'Diário',
    isActive: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, name: nameFilter || undefined }));
    }, 500);

    return () => clearTimeout(timer);
  }, [nameFilter]);

  useEffect(() => {
    loadHabits();
  }, [filters]);

  const loadHabits = async () => {
    const result = await execute(() => apiService.getHabits(filters));
    if (result) {
      setHabits(result);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      const result = await execute(() => apiService.updateHabit(isEditing, formData));
      if (result) {
        await loadHabits();
        resetForm();
      }
    } else {
      const result = await execute(() => apiService.createHabit(formData));
      if (result) {
        await loadHabits();
        resetForm();
      }
    }
  };

  const handleEdit = (habit: Habit) => {
    setIsEditing(habit.id);
    setFormData({
      name: habit.name,
      description: habit.description || '',
      frequency: habit.frequency,
      isActive: habit.isActive,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este hábito?')) {
      const result = await execute(() => apiService.deleteHabit(id));
      if (result !== null) {
        await loadHabits();
      }
    }
  };

  const handleToggleActive = async (habit: Habit) => {
    const result = await execute(() => apiService.patchHabit(habit.id, { isActive: !habit.isActive }));
    if (result) {
      await loadHabits();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      frequency: 'Diário',
      isActive: true,
    });
    setIsEditing(null);
    setShowForm(false);
  };

  return (
    <div className="habits-container">
      <header className="habits-header">
        <div>
          <h1>Meus Hábitos</h1>
          <p>Bem-vindo, {user?.name}!</p>
        </div>
        <button onClick={logout} className="btn-secondary">
          Sair
        </button>
      </header>

      <div className="habits-content">
        <div className="habits-sidebar">
          <div className="filters-section">
            <h2>Filtros</h2>
            <div className="filter-group">
              <label>Status:</label>
              <select
                value={filters.isActive === undefined ? '' : String(filters.isActive)}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilters({
                    ...filters,
                    isActive: value === '' ? undefined : value === 'true',
                  });
                }}
              >
                <option value="">Todos</option>
                <option value="true">Ativos</option>
                <option value="false">Inativos</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Frequência:</label>
              <select
                value={filters.frequency || ''}
                onChange={(e) => setFilters({ ...filters, frequency: e.target.value as any || undefined })}
              >
                <option value="">Todas</option>
                {FREQUENCY_OPTIONS.map((freq) => (
                  <option key={freq} value={freq}>
                    {freq}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Nome:</label>
              <input
                type="text"
                placeholder="Buscar por nome..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </div>
            <button
              onClick={() => {
                setFilters({});
                setNameFilter('');
              }}
              className="btn-clear-filters"
            >
              Limpar Filtros
            </button>
          </div>

          <button onClick={() => setShowForm(!showForm)} className="btn-primary btn-new-habit">
            {showForm ? 'Cancelar' : '+ Novo Hábito'}
          </button>
        </div>

        <div className="habits-main">
          {showForm && (
            <div className="habit-form-card">
              <h2>{isEditing ? 'Editar Hábito' : 'Novo Hábito'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nome *</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    minLength={2}
                    maxLength={100}
                    placeholder="Ex: Academia"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Descrição</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    maxLength={500}
                    rows={3}
                    placeholder="Descrição opcional do hábito"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="frequency">Frequência *</label>
                  <select
                    id="frequency"
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
                    required
                  >
                    {FREQUENCY_OPTIONS.map((freq) => (
                      <option key={freq} value={freq}>
                        {freq}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                    Ativo
                  </label>
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    {isEditing ? 'Atualizar' : 'Criar'}
                  </button>
                  <button type="button" onClick={resetForm} className="btn-secondary">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="habits-list">
            {habits.length === 0 ? (
              <div className="empty-state">
                <p>Nenhum hábito encontrado.</p>
                {!showForm && (
                  <button onClick={() => setShowForm(true)} className="btn-primary">
                    Criar Primeiro Hábito
                  </button>
                )}
              </div>
            ) : (
              habits.map((habit) => (
                <div key={habit.id} className={`habit-card ${!habit.isActive ? 'inactive' : ''}`}>
                  <div className="habit-header">
                    <h3>{habit.name}</h3>
                    <span className={`status-badge ${habit.isActive ? 'active' : 'inactive'}`}>
                      {habit.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  {habit.description && <p className="habit-description">{habit.description}</p>}
                  <div className="habit-meta">
                    <span className="frequency-badge">{habit.frequency}</span>
                    <span className="habit-date">
                      Criado em: {new Date(habit.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="habit-actions">
                    <button
                      onClick={() => handleToggleActive(habit)}
                      className={`btn-toggle ${habit.isActive ? 'deactivate' : 'activate'}`}
                    >
                      {habit.isActive ? 'Desativar' : 'Ativar'}
                    </button>
                    <button onClick={() => handleEdit(habit)} className="btn-edit">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(habit.id)} className="btn-delete">
                      Excluir
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

