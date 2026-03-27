import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import { TextField, Button, CircularProgress, Alert, Avatar, Box } from '@mui/material';

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
`;

const SettingsSection = styled.div`
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f5f5f5;
    border-radius: 8px;
`;

const SectionTitle = styled.h2`
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    color: #333;
`;

const FormGroup = styled.div`
    margin-bottom: 1rem;

    & > label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #333;
    }
`;

const AvatarContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;

    button {
        flex: 1;
    }
`;

interface UserSettings {
    id: string;
    name: string;
    email: string;
    profile_picture?: string;
}

const UsersSettingsPage: React.FC = () => {
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    
    const [formData, setFormData] = useState<UserSettings>({
        id: '',
        name: '',
        email: '',
        profile_picture: '',
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    useEffect(() => {
        if (!user) {
            router.push('/');
            return;
        }
        
        fetchUserSettings();
    }, [user, router]);

    const fetchUserSettings = async () => {
        try {
            setLoading(true);
            setError(null);
            //create mock response
            const response = { data: { data: { id: '123456789', name: user?.name, email: user?.email, profile_picture: 'https://app.energiasmart.com.br/images/210819130.png' } } };
            //mock response end
            //const response = await api.get('/user');
            const userData = response.data.data;
            setFormData({
                id: userData.id,
                name: userData.name,
                email: userData.email,
                profile_picture: userData.profile_picture,
            });
        } catch (err) {
            setError('Erro ao carregar configurações do usuário');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = async () => {
        try {
            setSaving(true);
            setError(null);
            setSuccess(null);

            const updatePayload = {
                name: formData.name,
                email: formData.email,
            };

            await api.put(`/user/${formData.id}`, updatePayload);
            setSuccess('Perfil atualizado com sucesso');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao salvar perfil');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setError('A nova senha deve ter pelo menos 6 caracteres');
            return;
        }

        try {
            setSaving(true);
            setError(null);
            setSuccess(null);

            await api.post('/user/change-password', {
                current_password: passwordData.currentPassword,
                password: passwordData.newPassword,
                password_confirmation: passwordData.confirmPassword,
            });

            setSuccess('Senha alterada com sucesso');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao alterar senha');
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container>
            <h1>Configurações da Conta</h1>

            {error && <Alert severity="error" style={{ marginBottom: '1rem' }}>{error}</Alert>}
            {success && <Alert severity="success" style={{ marginBottom: '1rem' }}>{success}</Alert>}

            <SettingsSection>
                <SectionTitle>Informações do Perfil</SectionTitle>
                
                <AvatarContainer>
                    <Avatar src={formData.profile_picture} sx={{ width: 80, height: 80 }} />
                    <div>
                        <p style={{ margin: '0 0 0.5rem 0' }}>Foto de Perfil</p>
                        <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
                            Faça upload de uma nova imagem para atualizar
                        </p>
                    </div>
                </AvatarContainer>

                <FormGroup>
                    <label htmlFor="name">Nome Completo</label>
                    <TextField
                        id="name"
                        fullWidth
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        variant="outlined"
                        size="small"
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="email">Email</label>
                    <TextField
                        id="email"
                        fullWidth
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        variant="outlined"
                        size="small"
                    />
                </FormGroup>

                <ButtonGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveProfile}
                        disabled={saving}
                    >
                        {saving ? <CircularProgress size={24} /> : 'Salvar Mudanças'}
                    </Button>
                </ButtonGroup>
            </SettingsSection>

            <SettingsSection>
                <SectionTitle>Alterar Senha</SectionTitle>

                <FormGroup>
                    <label htmlFor="currentPassword">Senha Atual</label>
                    <TextField
                        id="currentPassword"
                        fullWidth
                        name="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        variant="outlined"
                        size="small"
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="newPassword">Nova Senha</label>
                    <TextField
                        id="newPassword"
                        fullWidth
                        name="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        variant="outlined"
                        size="small"
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="confirmPassword">Confirmar Senha</label>
                    <TextField
                        id="confirmPassword"
                        fullWidth
                        name="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        variant="outlined"
                        size="small"
                    />
                </FormGroup>

                <ButtonGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleChangePassword}
                        disabled={saving}
                    >
                        {saving ? <CircularProgress size={24} /> : 'Alterar Senha'}
                    </Button>
                </ButtonGroup>
            </SettingsSection>
        </Container>
    );
};

export default UsersSettingsPage;