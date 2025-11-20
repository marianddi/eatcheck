import React, { useState } from 'react'

const Profile = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    targetWeight: '',
    dday: '',
    bmr: '',
    exerciseTime: ''
  })

  const [showTooltip, setShowTooltip] = useState(false)

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    console.log('프로필 데이터:', formData)
    // 저장 로직 추가
    alert('저장되었습니다!')
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '40px 20px',
    }}>
      <div style={{
        maxWidth: '400px',
        margin: '0 auto',
      }}>
        {/* 제목 */}
        <h1 style={{
          fontSize: '22px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '10px',
          color: '#000',
        }}>
          저희는 식단을 도와드려요!
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '14px',
          marginBottom: '30px',
        }}>
          아래의 정보를 입력해 주세요.
        </p>

        {/* 입력 폼들 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* 나이 */}
          <div style={{
            backgroundColor: '#d9d9d9',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
            <label style={{
              padding: '16px 20px',
              minWidth: '120px',
              fontSize: '15px',
              color: '#333',
            }}>
              나이
            </label>
            <div style={{
              width: '1px',
              height: '30px',
              backgroundColor: '#bbb',
            }}></div>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => handleChange('age', e.target.value)}
              style={{
                flex: 1,
                padding: '16px 20px',
                border: 'none',
                backgroundColor: 'transparent',
                outline: 'none',
                fontSize: '15px',
              }}
            />
          </div>

          {/* 성별 */}
          <div style={{
            backgroundColor: '#d9d9d9',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
            <label style={{
              padding: '16px 20px',
              minWidth: '120px',
              fontSize: '15px',
              color: '#333',
            }}>
              성별
            </label>
            <div style={{
              width: '1px',
              height: '30px',
              backgroundColor: '#bbb',
            }}></div>
            <input
              type="text"
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              style={{
                flex: 1,
                padding: '16px 20px',
                border: 'none',
                backgroundColor: 'transparent',
                outline: 'none',
                fontSize: '15px',
              }}
            />
          </div>

          {/* 키 */}
          <div style={{
            backgroundColor: '#d9d9d9',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
            <label style={{
              padding: '16px 20px',
              minWidth: '120px',
              fontSize: '15px',
              color: '#333',
            }}>
              키(cm)
            </label>
            <div style={{
              width: '1px',
              height: '30px',
              backgroundColor: '#bbb',
            }}></div>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => handleChange('height', e.target.value)}
              style={{
                flex: 1,
                padding: '16px 20px',
                border: 'none',
                backgroundColor: 'transparent',
                outline: 'none',
                fontSize: '15px',
              }}
            />
          </div>

          {/* 몸무게 */}
          <div style={{
            backgroundColor: '#d9d9d9',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
            <label style={{
              padding: '16px 20px',
              minWidth: '120px',
              fontSize: '15px',
              color: '#333',
            }}>
              몸무게
            </label>
            <div style={{
              width: '1px',
              height: '30px',
              backgroundColor: '#bbb',
            }}></div>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
              style={{
                flex: 1,
                padding: '16px 20px',
                border: 'none',
                backgroundColor: 'transparent',
                outline: 'none',
                fontSize: '15px',
              }}
            />
          </div>

          {/* 목표 체중 */}
          <div style={{
            backgroundColor: '#d9d9d9',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
            <label style={{
              padding: '16px 20px',
              minWidth: '120px',
              fontSize: '15px',
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}>
              목표 체중
            </label>
            <div style={{
              width: '1px',
              height: '30px',
              backgroundColor: '#bbb',
            }}></div>
            <input
              type="number"
              value={formData.targetWeight}
              onChange={(e) => handleChange('targetWeight', e.target.value)}
              style={{
                flex: 1,
                padding: '16px 20px',
                border: 'none',
                backgroundColor: 'transparent',
                outline: 'none',
                fontSize: '15px',
              }}
            />
          </div>

          {/* 달성기간 */}
          <div style={{
            backgroundColor: '#d9d9d9',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
            <label style={{
              padding: '16px 20px',
              minWidth: '120px',
              fontSize: '15px',
              color: '#333',
            }}>
              달성기간(D-day)
            </label>
            <div style={{
              width: '1px',
              height: '30px',
              backgroundColor: '#bbb',
            }}></div>
            <input
              type="number"
              value={formData.dday}
              onChange={(e) => handleChange('dday', e.target.value)}
              style={{
                flex: 1,
                padding: '16px 20px',
                border: 'none',
                backgroundColor: 'transparent',
                outline: 'none',
                fontSize: '15px',
              }}
            />
          </div>

          {/* 기초대사량 - 툴팁 추가 */}
          <div style={{ position: 'relative' }}>
            <div style={{
              backgroundColor: '#d9d9d9',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
            }}>
              <label style={{
                padding: '16px 20px',
                minWidth: '120px',
                fontSize: '15px',
                color: '#333',
                display: 'flex',
                alignItems: 'left',
                gap: '5px',
              }}>
                기초대사량
                <span 
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onClick={() => setShowTooltip(!showTooltip)}
                  style={{ 
                    fontSize: '14px', 
                    color: '#666',
                    cursor: 'pointer',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: '1px solid #666',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  ⓘ
                </span>
              </label>
              <div style={{
                width: '1px',
                height: '30px',
                backgroundColor: '#bbb',
              }}></div>
              <input
                type="number"
                value={formData.bmr}
                onChange={(e) => handleChange('bmr', e.target.value)}
                style={{
                  flex: 1,
                  padding: '16px 20px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  fontSize: '15px',
                }}
              />
            </div>

            {/* 툴팁 */}
            {showTooltip && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                right: '0',
                marginTop: '8px',
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '15px',
                padding: '15px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 1000,
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#333',
              }}>
                <strong style={{ display: 'block', marginBottom: '8px', color: '#000' }}>
                  기초 대사량이란?
                </strong>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                  기초대사량은 생명을 유지하는데 필요한 최소한의 에너지를 뜻해요.
                </p>
                <p style={{ marginTop: '8px', marginBottom: 0, fontSize: '10px', color: '#666' }}>
                  기초 대사량은 성별, 나이, 키, 몸무게를 이용하여 예측할 수 있지만 부정확해요. 
                  해당 입력란은 성별과 나이, 키, 몸무게를 입력하면 자동으로 예측 값이 삽입되나, 
                  체성분 검사를 통해 정확한 수치를 알고 계신 경우에는 직접 입력 해 주세요.
                </p>
              </div>
            )}
          </div>

          {/* 주당 운동시간 */}
          <div style={{
            backgroundColor: '#d9d9d9',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
            <label style={{
              padding: '16px 20px',
              minWidth: '120px',
              fontSize: '15px',
              color: '#333',
            }}>
              주당 운동시간
            </label>
            <div style={{
              width: '1px',
              height: '30px',
              backgroundColor: '#bbb',
            }}></div>
            <input
              type="number"
              value={formData.exerciseTime}
              onChange={(e) => handleChange('exerciseTime', e.target.value)}
              style={{
                flex: 1,
                padding: '16px 20px',
                border: 'none',
                backgroundColor: 'transparent',
                outline: 'none',
                fontSize: '15px',
              }}
            />
          </div>
        </div>

        {/* 확인 버튼 */}
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            marginTop: '30px',
            padding: '16px',
            backgroundColor: '#90EE90',
            border: 'none',
            borderRadius: '20px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
            cursor: 'pointer',
          }}
        >
          확인
        </button>
      </div>
    </div>
  )
}

export default Profile